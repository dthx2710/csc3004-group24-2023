const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "csc3004-g24-testsecret";

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
  const [datePart, timePart] = dateString.split(" ");

  // Split the date part into day, month, and year components
  const [day, month, year] = datePart.split("/");

  // Split the time part into hour, minute, and second components
  const [hour, minute, second] = timePart.split(":");

  // Create a new Date object using the parsed values
  const dateObject = new Date(year, month - 1, day, hour, minute, second);

  return dateObject;
}

async function pollCreate(user_id, pollInfo, options) {
  // check if user is admin
  const user = await prisma.users.findFirst({
    where: {
      user_id: user_id,
    },
    select: {
      user_type: true,
    },
  });
  if (!user.user_type === "admin") {
    console.log("Invalid permissions to create poll");
    return null;
  }
  const startTime = createDateObject(pollInfo.poll_starttime);
  const endTime = createDateObject(pollInfo.poll_endtime);
  isCompulsory = pollInfo.is_compulsory === "true" ? true : false;
  const constituencyId = await prisma.constituency.findFirst({
    where: {
      key_value: pollInfo.constituency_id,
    },
    select: {
      constituency_id: true,
    },
  });
  const poll = await prisma.poll.create({
    data: {
      poll_starttime: startTime,
      poll_endtime: endTime,
      status: pollInfo.status,
      constituency_id: constituencyId.constituency_id,
      poll_title: pollInfo.poll_title,
      poll_description: pollInfo.poll_description,
      is_compulsory: isCompulsory,
    },
  });

  for (let i = 0; i < options.length; i++) {
    await prisma.options.create({
      data: {
        poll_id: poll.poll_id,
        option_name: options[i],
      },
    });
  }

  await prisma.$disconnect();
  return poll.poll_id;
}

async function pollDelete(user_id, poll_id) {
  // check if user is admin
  const user = await prisma.users.findFirst({
    where: {
      user_id: user_id,
    },
    select: {
      user_type: true,
    },
  });
  if (!user.user_type === "admin") {
    console.log("Invalid permissions to delete poll");
    return null;
  }
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

async function pollInfo(user_id, poll_id) {
  // check if user is admin
  const user = await prisma.users.findFirst({
    where: {
      user_id: user_id,
    },
    select: {
      user_type: true,
      constituency_id: true,
    },
  });
  const poll = await prisma.poll.findFirst({
    where: {
      poll_id: poll_id,
    },
  });
  if (!user.user_type === "admin") {
    // check if constituency matches
    if (poll.constituency_id !== user.constituency_id) {
      console.log("Invalid permissions to view poll");
      return null;
    }
    // check if user has already voted on this poll: whether poll_id and hash_id exists in votes table
    const voted = await prisma.votes.findFirst({
      where: {
        poll_id: polls[i].poll_id,
        voter_id: user.hash_id,
      },
    });
    if (voted) {
      poll.has_voted = true;
    } else {
      poll.has_voted = false;
    }
  } else {
    poll.has_voted = false;
  }
  // load options
  const options = await prisma.options.findMany({
    where: {
      poll_id: poll_id,
    },
  });

  const pollInfo = {
    poll_item: poll,
    options_id: options.map((option) => option.option_id),
    options: options.map((option) => option.option_name),
  };
  await prisma.$disconnect();
  return pollInfo;
}

async function allPollInfo(user_id) {
  // check if user is admin
  const user = await prisma.users.findFirst({
    where: {
      user_id: user_id,
    },
    select: {
      user_type: true,
      constituency_id: true,
      hash_id: true,
    },
  });
  if (user.user_type === "admin") {
    const polls = await prisma.poll.findMany();
    for (let i = 0; i < polls.length; i++) {
      polls[i].has_voted = false;
    }
    await prisma.$disconnect();
    return polls;
  } else {
    const polls = await prisma.poll.findMany({
      where: {
        constituency_id: user.constituency_id,
      },
    });
    // check if user has already voted on this poll: whether poll_id and hash_id exists in votes table
    for (let i = 0; i < polls.length; i++) {
      const voted = await prisma.votes.findFirst({
        where: {
          poll_id: polls[i].poll_id,
          voter_id: user.hash_id,
        },
      });
      if (voted) {
        polls[i].has_voted = true;
      } else {
        polls[i].has_voted = false;
      }
    }
    await prisma.$disconnect();
    return polls;
  }
}

function CreatePoll(call, callback) {
  const token = call.metadata.get("authorization")[0].split(" ")[1];
  const userId = decodeToken(token);
  pollCreate(userId, call.request.poll_info, call.request.options)
    .then((id) => {
      callback(null, { poll_id: id, success: true });
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function DeletePoll(call, callback) {
  const token = call.metadata.get("authorization")[0].split(" ")[1];
  const userId = decodeToken(token);
  pollDelete(userId, call.request.poll_id)
    .then(() => {
      callback(null, { success: true });
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function GetPoll(call, callback) {
  const token = call.metadata.get("authorization")[0].split(" ")[1];
  const userId = decodeToken(token);
  pollInfo(userId, call.request.poll_id)
    .then((pollResponse) => {
      callback(null, pollResponse);
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function GetAllPolls(call, callback) {
  const token = call.metadata.get("authorization")[0].split(" ")[1];
  const userId = decodeToken(token);
  allPollInfo(userId)
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
  server.addService(pollProto.Poll.service, {
    CreatePoll: CreatePoll,
    DeletePoll: DeletePoll,
    GetPoll: GetPoll,
    GetAllPolls: GetAllPolls,
  });
  return server;
}

const host = process.env.POLL_HOST || "0.0.0.0";
const port = process.env.POLL_PORT || "50052";
const pollServer = getServer();
pollServer.bindAsync(
  `${host}:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Poll-service is listening on port " + port);
    pollServer.start();
  }
);
