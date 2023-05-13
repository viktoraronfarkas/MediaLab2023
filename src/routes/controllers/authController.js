// authController.js
const bcrypt = require('bcrypt');
const pool = require('../config/database');

exports.signup = (req, res) => {
  const { email, name, username, password, confirm_password } = req.body;
  const role_id = 1; // assuming role_id for regular users is 1

  if (!email) {
    return res.status(400).json({ message: 'Email not provided' });
  }

  if (!name) {
    return res.status(400).json({ message: 'Name not provided' });
  }

  if (!username) {
    return res.status(400).json({ message: 'Username not provided' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password not provided' });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Failed to connect to MySQL' });
    }

    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (error, results) => {
        if (error) {
          connection.release();
          console.error('Error querying MySQL:', error);
          return res.status(500).json({ message: 'Error while creating user' });
        }

        if (results.length > 0) {
          connection.release();
          return res.status(409).json({ message: 'Email already exists' });
        }

        bcrypt.hash(password, 12, (err, passwordHash) => {
          if (err) {
            connection.release();
            console.error('Error hashing password:', err);
            return res
              .status(500)
              .json({ message: 'Error while hashing password' });
          }

          connection.query(
            'INSERT INTO users (email, name, username, password, role_id) VALUES (?, ?, ?, ?, ?)',
            [email, name, username, passwordHash, role_id],
            (error, results) => {
              connection.release();

              if (error) {
                console.error('Error creating user:', error);
                return res
                  .status(500)
                  .json({ message: 'Error while creating user' });
              }

              return res.status(200).json({ message: 'User created' });
            }
          );
        });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ error: 'Failed to connect to MySQL' });
    }

    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (error, results) => {
        connection.release();

        if (error) {
          console.error('Error querying MySQL:', error);
          return res
            .status(500)
            .json({ error: 'Failed to fetch data from MySQL' });
        }

        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.error('Error comparing password hashes:', err);
            return res
              .status(500)
              .json({ error: 'Error while comparing password hashes' });
          }

          if (!result) {
            return res.status(401).json({ error: 'Invalid email or password' });
          }

          return res.json({ message: 'Login successful', user });
        });
      }
    );
  });
};
