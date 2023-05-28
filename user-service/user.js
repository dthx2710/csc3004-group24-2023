const { Client } = require('pg')
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("dotenv").config();

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432,
})

const packageDefinition = protoLoader.loadSync("proto/user-service.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const userProto = protoDescriptor.user_service;

// Database connection
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function Login(username, password) {
  console.log("Login request received");
  return new Promise((resolve, reject) => {
    client.query('SELECT * FROM accounts WHERE username = $1', [username], (err, result) => {
      if (err) {
        console.log(err.stack);
        reject(err);
      }

      if (result.rows[0].password === password) {
        console.log("Login successful");
        resolve(result.rows[0]);
      } else {
        resolve(null);
      }
    });
  });
}
async function LoginUser(call, callback) {
  callback(null, Login(call.request.username, call.request.password))
}

function getServer() {
  const server = new grpc.Server();
  server.addService(userProto.User.service, {
    LoginUser: LoginUser,
  });
  return server;
}

const port = process.env.USER_SERVICE_URL.split(":")[1] || 50051;
const userServer = getServer();
userServer.bindAsync(process.env.USER_SERVICE_URL, grpc.ServerCredentials.createInsecure(), () => {
  console.log("User-service is listening on port " + port);
  userServer.start();
});

