// authController.js
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const pool = require('../config/database');

// Set up Multer storage for file uploads
/* const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadPath = path.join(__dirname, '../../../uploads');
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = file.mimetype.split('/')[1]; // Get the file extension from the mimetype
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`); // Set a unique filename with the file extension
  },
}); */

/* const upload = multer({
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
}).single('profile_image'); */

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

exports.signup = (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred while uploading
      return res.status(500).json({ message: 'Error uploading file' });
    }
    if (err) {
      console.error('Error uploading file:', err);
      return res
        .status(500)
        .json({ message: 'Error uploading file', error: err.message });
    }

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

    // Get the file path or filename from `req.file` and store it in the `profile_image` column of your users table
    // const fileExtension = req.file ? req.file.filename.split('.').pop() : null;
    // const profileImage = req.file ? req.file.filename : null;
    const profileImage = req.file ? req.file.buffer : null; // Access the file buffer instead of the file path

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
            return res
              .status(500)
              .json({ message: 'Error while creating user' });
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
              'INSERT INTO users (email, name, username, password, role_id, profile_image) VALUES (?, ?, ?, ?, ?, ?)',
              [email, name, username, passwordHash, role_id, profileImage],
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
