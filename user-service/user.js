const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "csc3004-g24-testsecret";

const packageDefinition = protoLoader.loadSync("proto/user-service.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const userProto = protoDescriptor.user_service;
const prisma = new PrismaClient();

async function Login(username, password) {
  const userDetails = await prisma.users.findFirst({
    where: {
      username: username,
    },
  });
  prisma.$disconnect();
  if (!userDetails) {
    console.log("User not found");
    return null;
  }

  try {
    const result = await new Promise((resolve, reject) => {
      bcrypt.compare(password, userDetails.password, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    if (result) {
      console.log("Login successful");
      return userDetails.user_id;
    } else {
      console.log("Wrong password");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

function LoginUser(call, callback) {
  Login(call.request.username, call.request.password)
    .then((id) => {
      if (!id) {
        callback(new Error("Login failed"));
        return;
      }
      // generate jwt token
      const token = jwt.sign({ sub: id }, jwtSecret, {
        expiresIn: 86400, // expires in 24 hours
      });
      callback(null, { token: token });
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

async function userInfo(user_id) {
  if (!user_id) {
    return null;
  }
  const userDetails = await prisma.users.findFirst({
    where: {
      user_id: user_id,
    },
  });
  prisma.$disconnect();
  if (!userDetails) {
    return null;
  } else {
    console.log("Get user info successful");
    return userDetails;
  }
}

function GetUser(call, callback) {
  const token = call.metadata.get("authorization")[0].split(" ")[1];
  const userId = decodeToken(token);
  userInfo(userId)
    .then((userDetails) => {
      callback(null, { user_info: userDetails });
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}

function decodeToken(token) {
  try {
    const decoded = jwt.verify(
      token,
      jwtSecret
    );
    return decoded.sub;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

function getServer() {
  const server = new grpc.Server();
  server.addService(userProto.User.service, {
    LoginUser: LoginUser,
    GetUser: GetUser,
  });
  return server;
}

const port = process.env.USER_SERVICE_URL.split(":")[1] || 50051;
const userServer = getServer();
userServer.bindAsync(
  process.env.USER_SERVICE_URL,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("User-service is listening on port " + port);
    userServer.start();
  }
);
