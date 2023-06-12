import { Kafka } from "kafkajs";
import voteType from "./vote_type.js";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET || "csc3004-g24-testsecret";

const packageDefinition = protoLoader.loadSync("proto/vote-service.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const voteProto = protoDescriptor.vote_service;

const SubmitVote = async (call, callback) => {
  console.log("Received grpc request:", call.request);
  const token = call.metadata.get("authorization")[0].split(" ")[1];
  const user_id = decodeToken(token);
  // user == hash_id from user table == voter_id from vote table
  // if user has already voted in the same poll, do not save vote
  const user = await prisma.users.findFirst({
    where: {
      user_id: user_id,
    },
    select: {
      hash_id: true,
    },
  });
  const existingVote = await prisma.votes.findFirst({
    where: {
      poll_id: call.request.vote_info.poll_id,
      voter_id: user.hash_id,
    },
  });
  if (existingVote) {
    console.log("User has already voted in this poll");
    callback(null, { success: false, message: "User has already voted" });
    return;
  }

  const messagePayload = {
    poll_id: call.request.vote_info.poll_id,
    option_id: call.request.vote_info.option_id,
    user_id: user_id
  }

  const success = await queueVote(messagePayload);
  if (success) {
    callback(null, { success: true, message: "Vote submitted" });
  } else {
    callback(null, { success: false, message: "Vote Error" });
  }
};

const queueVote = async (data) => {
  // deconstruct data
  const { poll_id, option_id, user_id } = data;
  // key as timestamp temporarily
  const key = new Date().getTime().toString();
  const value = voteType.toBuffer({
    poll_id: poll_id,
    option_id: option_id,
    user_id: user_id,
  });
  await producer.send({
    topic: "votes",
    messages: [{ key, value }],
  });
  return true;
};

function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded.sub;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

const getServer = () => {
  const server = new grpc.Server();
  server.addService(voteProto.Vote.service, {
    SubmitVote: SubmitVote,
  });
  return server;
};

const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
await producer
  .connect()
  .then(() => {
    console.log("Connected to kafka");
    const port = process.env.VOTE_SERVICE_URL.split(":")[1] || 50054;
    const voteServer = getServer();
    voteServer.bindAsync(
      process.env.VOTE_SERVICE_URL,
      grpc.ServerCredentials.createInsecure(),
      () => {
        console.log("Vote-service is listening on port " + port);
        voteServer.start();
      }
    );
  })
  .catch((err) => {
    console.log(err);
  });
