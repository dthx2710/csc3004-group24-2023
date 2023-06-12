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

function createDateObject(dateString) {
    // Split the string into date and time components
  const [datePart, timePart] = dateString.split(' ');

  // Split the date part into day, month, and year components
  const [day, month, year] = datePart.split('/');

  // Split the time part into hour, minute, and second components
  const [hour, minute, second] = timePart.split(':');

  // Create a new Date object using the parsed values
  const dateObject = new Date(year, month - 1, day, hour, minute, second);

  return dateObject;
}

async function pollCreate(pollInfo, options) {
  const startTime = createDateObject(pollInfo.poll_starttime);
  const endTime = createDateObject(pollInfo.poll_endtime);
  isCompulsory = pollInfo.is_compulsory === 'true' ? true : false;
  const constituencyId = await prisma.constituency.findFirst({
    where: {
      key_value: pollInfo.constituency_id,
    },
    select: {
      constituency_id: true
    }
  });
  console.log(constituencyId.constituency_id);
  const poll = await prisma.poll.create({
    data: {
      poll_starttime: startTime,
      poll_endtime: endTime,
      status: pollInfo.status,
      constituency_id: constituencyId.constituency_id,
      poll_title: pollInfo.poll_title,
      poll_description: pollInfo.poll_description,
      is_compulsory: isCompulsory,
    }
  })

  for (let i = 0; i < options.length; i++) {
    await prisma.options.create({
      data: {
        poll_id: poll.poll_id,
        option_name: options[i],
      }
    })
  }

  await prisma.$disconnect();
  return poll.poll_id;
}

async function pollDelete(poll_id) {
  await prisma.poll.delete({
    where: {
      poll_id: poll_id,
    },
  });

  await prisma.options.deleteMany({
    where: {
      poll_id: poll_id,
    },
  });

  await prisma.$disconnect();
}

async function pollInfo(id) {
  const poll = await prisma.options.findMany({
    where: {
      poll_id: id,
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
  console.log(call.request.poll_id);
  pollDelete(call.request.poll_id)
    .then(() => {
      callback(null, { success: true });
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function GetPoll(call, callback) {
  pollInfo(call.request.poll_id)
    .then((pollDetails) => {
      const response = {
        options_id: [],
        options: []
      };

      pollDetails.forEach((option) => {
        response.options_id.push(option.option_id);
        response.options.push(option.option_name);
      });

      callback(null, response);
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function GetAllPolls(call, callback) {
  allPollInfo()
    .then((pollsArray) => {
      const pollItems = pollsArray.map((poll) => {
        return { poll_id: poll.poll_id, poll_info: poll };
      });
      callback(null, { poll_item: pollItems });
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
