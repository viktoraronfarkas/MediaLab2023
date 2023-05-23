const multer = require('multer');
const pool = require('../config/database');

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
}).single('subgroup_image');

exports.getPostsBySubgroupId = (req, res) => {
  const { subgroupId } = req.params;

  // eslint-disable-next-line consistent-return
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }

    connection.query(
      'SELECT * FROM posts WHERE group_id = ?',
      [subgroupId],
      // eslint-disable-next-line consistent-return
      (error, results) => {
        connection.release();

        if (error) {
          console.error('Error querying MySQL:', error);
          return res
            .status(500)
            .json({ error: 'Failed to fetch data from MySQL' });
        }

        res.json(results);
      }
    );
  });
};

exports.getEventsBySubgroupId = (req, res) => {
  const { subgroupId } = req.params;

  // eslint-disable-next-line consistent-return
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }

    connection.query(
      'SELECT * FROM events WHERE group_id = ?',
      [subgroupId],
      // eslint-disable-next-line consistent-return
      (error, results) => {
        connection.release();

        if (error) {
          console.error('Error querying MySQL:', error);
          return res
            .status(500)
            .json({ error: 'Failed to fetch data from MySQL' });
        }

        res.json(results);
      }
    );
  });
};

exports.createSubroup = (req, res) => {
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
    const { name, mainGroupId, caption, introduction } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: 'Subgroup name not provided' });
    }
    if (!mainGroupId) {
      return res.status(400).json({ message: 'Main group ID not provided' });
    }
    if (!caption) {
      return res.status(400).json({ message: 'Caption not provided' });
    }
    if (!introduction) {
      return res.status(400).json({ message: 'Introduction not provided' });
    }

    // Access the file buffer instead of the file path
    const subgroupImage = req.file ? req.file.buffer : null;

    // Connect to the database pool
    // eslint-disable-next-line consistent-return
    pool.getConnection((dbErr, connection) => {
      if (dbErr) {
        console.error('Error getting MySQL connection:', dbErr);
        return res.status(500).json({ message: 'Failed to connect to MySQL' });
      }

      connection.query(
        'INSERT INTO subgroups (name, main_group_id, caption, Description, title_image) VALUES (?, ?, ?, ?)',
        [name, mainGroupId, caption, introduction, subgroupImage],
        (insertErr) => {
          connection.release();

          if (insertErr) {
            console.error('Error creating subgroup:', insertErr);
            return res
              .status(500)
              .json({ message: 'Error while creating subgroup' });
          }

          return res.status(200).json({ message: 'Subgroup created' });
        }
      );
    });
  });
};
