const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const packageDefinition = protoLoader.loadSync("proto/poll-service.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const pollProto = protoDescriptor.poll_service;

const prisma = new PrismaClient();

async function pollCreate(pollInfo, options) {
  const poll = await prisma.poll.create({
    data: {
      ...pollInfo,
      options: {
        create: options,
      },
    },
    include: {
      options: true,
    },
  });
  await prisma.$disconnect();
  return poll.id;
}

async function pollDelete(id) {
  await prisma.poll.delete({
    where: {
      id: id,
    },
  });
  await prisma.$disconnect();
}

async function pollInfo(id) {
  const poll = await prisma.poll.findUnique({
    where: {
      id: id,
    },
    include: {
      options: true,
    },
  });
  await prisma.$disconnect();

  // destructure poll object to get options array and poll info
  // based on proto file
        
  return poll;
}

async function allPollInfo() {
  const polls = await prisma.poll.findMany();
  await prisma.$disconnect();
  return polls;
}

function CreatePoll(call, callback) {
  pollCreate(call.request.poll_info, call.request.options)
    .then((id) => {
      callback(null, { poll_id: id, success: true });
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function DeletePoll(call, callback) {
  pollDelete(call.request.id)
    .then(() => {
      callback(null, { success: true });
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function GetPoll(call, callback) {
  pollInfo(call.request.id)
    .then((pollDetails) => {
      callback(null, pollDetails);
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function GetAllPolls(call, callback) {
  console.log(call.request.poll_id);
  allPollInfo()
    .then((pollsArray) => {
      callback(null, { poll_list: pollsArray });
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function getServer() {
  const server = new grpc.Server();
  server.addService(pollProto.Poll.service, {
    CreatePoll: CreatePoll,
    DeletePoll: DeletePoll,
    GetPoll: GetPoll,
    GetAllPolls: GetAllPolls,
  });
  return server;
}

const port = process.env.POLL_SERVICE_URL.split(":")[1] || 50052;
const pollServer = getServer();
pollServer.bindAsync(
  process.env.POLL_SERVICE_URL,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Poll-service is listening on port " + port);
    pollServer.start();
  }
);
