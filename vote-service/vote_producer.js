import { Kafka } from "kafkajs";
import voteType from "./vote_type.js";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
dotenv.config();

const packageDefinition = protoLoader.loadSync("proto/vote-service.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const voteProto = protoDescriptor.vote_service;

const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
await producer.connect().catch((err) => {
  console.log(err);
});
console.log("Connected to kafka");

const SubmitVote = async (call, callback) => {
  console.log("Received grpc request:", call.request);
  const success = await queueVote(call.request);
  if (success) {
    callback(null, { success: true, message: "Vote submitted" });
  } else {
    callback(null, { success: false, message: "Vote Error" });
  }
};

const queueVote = async (data) => {
  // deconstruct data
  const { poll_id, option_id, user_id } = data.vote_info;
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

// await producer.disconnect();

const getServer = () => {
  const server = new grpc.Server();
  server.addService(voteProto.Vote.service, {
    SubmitVote: SubmitVote,
  });
  return server;
};

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
