const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "csc3004-g24-testsecret";

const packageDefinition = protoLoader.loadSync("proto/result-service.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const resultProto = protoDescriptor.result_service;

async function resultInfo(user_id, poll_id) {
  if (!poll_id) {
    console.log("Poll not found");
    return null;
  }
  // check if user is admin
  const userDetails = await prisma.users.findFirst({
    where: {
      user_id: user_id,
    },
  });
  if (!userDetails.user_type === "admin") {
    console.log("User is not admin");
    return null;
  }
  // find all the options for the poll (poll_options > option_id_list > option_details)
  const optionDetails = await prisma.options.findMany({
    where: {
      poll_id: poll_id,
    },
  });
  const voteDetails = await prisma.votes.findMany({
    where: {
      poll_id: poll_id,
    },
  });
  prisma.$disconnect();
  // tally the votes for each option and return the result
  if (optionDetails && voteDetails) {
    const result = {
      poll_id: poll_id,
      option_names: [],
      vote_tally: [],
    };
    for (let i = 0; i < optionDetails.length; i++) {
      const option = optionDetails[i];
      const option_id = option.option_id;
      const option_name = option.option_name;
      const option_votes = voteDetails.filter(
        (vote) => vote.option_id === option_id
      ).length;
      result.option_names.push(option_name);
      result.vote_tally.push(option_votes);
    }

    return result;
  } else {
    return null;
  }
}

function GetResult(call, callback) {
  const token = call.metadata.get("authorization")[0].split(" ")[1];
  const userId = decodeToken(token);
  resultInfo(userId, call.request.poll_id)
    .then((resultDetails) => {
      callback(null, { result_info: resultDetails });
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded.sub;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

function getServer() {
  const server = new grpc.Server();
  server.addService(resultProto.Result.service, {
    GetResult: GetResult,
  });
  return server;
}

const host = "0.0.0.0";
const port = ":50053";
const resultServer = getServer();
resultServer.bindAsync(
  host + port,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Result-service is listening on port " + port);
    resultServer.start();
  }
);
