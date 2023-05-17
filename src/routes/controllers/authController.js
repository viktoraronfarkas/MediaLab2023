// authController.js
const bcrypt = require('bcrypt');
const multer = require('multer');
const pool = require('../config/database');

// Configure multer for file upload
const storage = multer.memoryStorage(); // Use MemoryStorage to store the uploaded file in memory
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set a file size limit (5MB in this example)
  fileFilter: (req, file, cb) => {
    // Check the file type and only allow certain file extensions
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'), false); // Reject the file
    }
  },
}).single('profile_image');

/**
 * User signup API
 * Handles user registration and profile image upload.
 *
 * Request body:
 * {
 *   email: string,
 *   name: string,
 *   username: string,
 *   password: string,
 *   confirm_password: string
 * }
 *
 * Response:
 * {
 *   message: string
 * }
 */
exports.signup = (req, res) => {
  // eslint-disable-next-line consistent-return
  upload(req, res, (uploadErr) => {
    // Handle file upload errors
    if (uploadErr instanceof multer.MulterError) {
      return res.status(500).json({ message: 'Error uploading file' });
    }
    if (uploadErr) {
      console.error('Error uploading file:', uploadErr);
      return res
        .status(500)
        .json({ message: 'Error uploading file', error: uploadErr.message });
    }

    // Retrieve user registration data from the request body
    const { email, name, username, password, confirmPassword } = req.body;
    const roleId = 1; // assuming role_id for regular users is 1

    // Validate required fields
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

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Access the file buffer instead of the file path
    const profileImage = req.file ? req.file.buffer : null;

    // Connect to the database pool
    // eslint-disable-next-line consistent-return
    pool.getConnection((dbErr, connection) => {
      if (dbErr) {
        console.error('Error getting MySQL connection:', dbErr);
        return res.status(500).json({ message: 'Failed to connect to MySQL' });
      }

      // Check if the email already exists
      connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        // eslint-disable-next-line consistent-return
        (queryErr, results) => {
          if (queryErr) {
            connection.release();
            console.error('Error querying MySQL:', queryErr);
            return res
              .status(500)
              .json({ message: 'Error while creating user' });
          }

          if (results.length > 0) {
            connection.release();
            return res.status(409).json({ message: 'Email already exists' });
          }

          // Hash the password
          // eslint-disable-next-line consistent-return
          bcrypt.hash(password, 12, (hashErr, passwordHash) => {
            if (hashErr) {
              connection.release();
              console.error('Error hashing password:', hashErr);
              return res
                .status(500)
                .json({ message: 'Error while hashing password' });
            }

            // Insert user data into the database
            connection.query(
              'INSERT INTO users (email, name, username, password, role_id, profile_image) VALUES (?, ?, ?, ?, ?, ?)',
              [email, name, username, passwordHash, roleId, profileImage],
              (insertErr) => {
                connection.release();

                if (insertErr) {
                  console.error('Error creating user:', insertErr);
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
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  pool.getConnection((connectionErr, connection) => {
    if (connectionErr) {
      console.error('Error getting MySQL connection:', connectionErr);
      return res.status(500).json({ error: 'Failed to connect to MySQL' });
    }

    // Query the database for the user with the provided email
    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      // eslint-disable-next-line consistent-return
      (queryErr, results) => {
        connection.release();

        if (queryErr) {
          console.error('Error querying MySQL:', queryErr);
          return res
            .status(500)
            .json({ error: 'Failed to fetch data from MySQL' });
        }

        // Check if the user exists
        if (results.length === 0) {
          return res.status(401).json({ error: 'invalidEmail' });
        }

        const user = results[0];

        // Compare the provided password with the stored password hash
        bcrypt.compare(password, user.password, (bcryptErr, result) => {
          if (bcryptErr) {
            console.error('Error comparing password hashes:', bcryptErr);
            return res
              .status(500)
              .json({ error: 'Error while comparing password hashes' });
          }

          // If the passwords match, return a success message and the user object
          if (!result) {
            return res.status(401).json({ error: 'invalidPassword' });
          }

          return res.json({ message: 'Login successful', user });
        });
      }
    );

    return null; // Add this line to satisfy the consistent-return ESLint rule
  });
};
