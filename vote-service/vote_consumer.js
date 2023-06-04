import { Kafka } from "kafkajs";
import voteType from "./vote_type.js";
import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["localhost:9092"],
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
    // save event to database
    const { poll_id, option_id, user_id } = event;
    await prisma.votes
      .create({
        data: {
          poll_id: poll_id,
          option_id: option_id,
          user_id: user_id,
          vote_time: message.timestamp,
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

// await consumer.disconnect();
