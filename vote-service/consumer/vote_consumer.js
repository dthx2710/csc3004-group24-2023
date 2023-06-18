import { Kafka } from "kafkajs";
import voteType from "./vote_type.js";
import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const kafkaHost = process.env.KAFKA_HOST || "kafka";
const kafkaPort = process.env.KAFKA_PORT || "9092";
const kafkaBroker = kafkaHost + ":" + kafkaPort.toString();
const kafka = new Kafka({
  clientId: "kafka",
  brokers: [kafkaBroker],
});

const consumer = kafka.consumer({ groupId: "vote-group" });
await consumer.connect().catch((err) => {
  console.log("Connect Error:", err);
});
console.log("Connected to kafka");

await consumer.subscribe({ topic: "votes", fromBeginning: true });
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const event = voteType.fromBuffer(message.value);
    console.log("Received message:", message.timestamp, event);

    // destructure object
    const { poll_id, option_id, user_id } = event;

    // user == hash_id from user table == voter_id from vote table
  // if user has already voted in the same poll, do not save vote
  const user = await prisma.users.findFirst({
    where: {
      user_id: user_id,
    },
    select : {
      hash_id: true,
    }
  });
  const existingVote = await prisma.votes.findFirst({
    where: {
      poll_id: poll_id,
      voter_id: user.hash_id,
    },
  });
    if (existingVote) {
      console.log("User has already voted in this poll");
      return;
    }

    // convert timestamp to Date object
    const timestamp = BigInt(message.timestamp);
    const formattedTimestamp = new Date(Number(timestamp));

    // save event to database
    await prisma.votes
      .create({
        data: {
          poll_id: poll_id,
          option_id: option_id,
          voter_id: user.hash_id,
          vote_time: formattedTimestamp,
        },
      })
      .then(() => {
        console.log("Vote saved");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  },
});
