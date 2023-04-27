// server.js
const express = require('express');
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'atp.fhstp.ac.at',
  port: 8007,
  user: 'flock-1946',
  password: 'b7ZHKNZmcAFD',
  database: 'db_flock-1946_1',
});

const app = express();

app.get('/maingroup', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err); // Log the error
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }

    connection.query('SELECT * FROM maingroup', (error, results) => {
      connection.release();

      if (error) {
        console.error('Error querying MySQL:', error); // Log the error
        return res
          .status(500)
          .json({ error: 'Failed to fetch data from MySQL' });
      }
      res.json(results);
    });
  });
});

app.listen(19006, () => {
  console.log('Server running on http://localhost:19006');
});
