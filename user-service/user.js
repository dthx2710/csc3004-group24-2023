const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("dotenv").config();
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');

const packageDefinition = protoLoader.loadSync("proto/user-service.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const userProto = protoDescriptor.user_service;

async function Login(username, password) {
  const prisma = new PrismaClient()
  const userDetails = await prisma.users.findFirst({
    where: {
        username: username
    },
  })
  prisma.$disconnect()
  if(!userDetails) {
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
      return userDetails;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

function LoginUser(call, callback) {
  Login(call.request.username, call.request.password)
    .then(id => {
      callback(null, id);
    })
    .catch(error => {
      console.error(error);
      callback(error);
    });
}


async function userInfo(id) {
  if (!id) {
    return null;
  }
  const prisma = new PrismaClient()
  const userDetails = await prisma.users.findFirst({
    where: {
        id: id
    },
  })
  prisma.$disconnect()
  if(!userDetails) {
    return null;
  }
  else{
    console.log("Get user info successful");
    return userDetails;
  }
}

function GetUser(call, callback) {
  userInfo(call.request.id)
    .then(userDetails => {
      callback(null, userDetails);
    })
    .catch(error => {
      console.error(error);
      callback(error);
    });
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
userServer.bindAsync(process.env.USER_SERVICE_URL, grpc.ServerCredentials.createInsecure(), () => {
  console.log("User-service is listening on port " + port);
  userServer.start();
});

