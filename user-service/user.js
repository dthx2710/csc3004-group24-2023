const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432,
})

function Login(username, password) {
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

const userLogin = async (request, response) => {
    try {
      loginDetails = await Login("test", "123");
      if (loginDetails != null) {
        response.status(200).json(loginDetails);
      }
    } catch (error) {
      // Handle error here
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const express = require('express')
const bodyParser = require('body-parser');
const { log } = require('@grpc/grpc-js/build/src/logging');
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users/:id', userLogin)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


