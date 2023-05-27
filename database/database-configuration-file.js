const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'GeneralElection',
  password: '123',
  port: 5432, // PostgreSQL default port
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err);
  }

  // Connection established successfully
  console.log('Connected to the database');

  // Perform necessary operations here

  // Release the client when done
  release();
});
