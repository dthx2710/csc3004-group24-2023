const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const packageDefinition = protoLoader.loadSync("proto/result-service.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const resultProto = protoDescriptor.result_service;

async function resultInfo(id) {
  if (!id) {
    return null;
  }
  const prisma = new PrismaClient();
  // find all the options for the poll (poll_options > option_id_list > option_details)
  const optionDetails = await prisma.poll_options.findFirst({
    where: {
      pollId: id,
    },
    include: {
      option_id_list: true,
    },
  });
  // find all the votes for the poll
  const voteDetails = await prisma.votes.findMany({
    where: {
      pollId: id,
    },
  });
  prisma.$disconnect();
  // tally the votes for each option and return the result
  if (optionDetails && voteDetails) {
    let result = {};
    for (let i = 0; i < optionDetails.option_id_list.length; i++) {
      result[optionDetails.option_id_list[i].option] = 0;
    }
    for (let i = 0; i < voteDetails.length; i++) {
      result[voteDetails[i].option] += 1;
    }
    return result;
  } else {
    return null;
  }
}

function GetResult(call, callback) {
  resultInfo(call.request.id)
    .then((resultDetails) => {
      callback(null, resultDetails);
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function getServer() {
  const server = new grpc.Server();
  server.addService(resultProto.Result.service, {
    GetResult: GetResult,
  });
  return server;
}

const port = process.env.RESULT_SERVICE_URL.split(":")[1] || 50051;
const resultServer = getServer();
resultServer.bindAsync(
  process.env.RESULT_SERVICE_URL,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Result-service is listening on port " + port);
    resultServer.start();
  }
);
