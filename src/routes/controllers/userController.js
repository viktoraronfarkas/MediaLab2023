const pool = require('../config/database');

// Subscribe a user to multiple main groups
exports.subscribeToMainGroups = (req, res) => {
  const { user_id, main_group_ids } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  if (!main_group_ids || !Array.isArray(main_group_ids)) {
    return res
      .status(400)
      .json({ message: 'Main group IDs not provided or invalid' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Failed to connect to MySQL' });
    }

    const values = main_group_ids.map((group_id) => [user_id, group_id]);

    connection.query(
      'INSERT INTO subscribedmaingroups (user_id, main_group_id) VALUES ?',
      [values],
      (error, results) => {
        connection.release();

        if (error) {
          console.error('Error subscribing user to main groups:', error);
          return res
            .status(500)
            .json({ message: 'Error while subscribing user to main groups' });
        }

        return res
          .status(200)
          .json({ message: 'User subscribed to main groups' });
      }
    );
  });
};

// Subscribe a user to subgroups
exports.subscribeToSubgroup = (req, res) => {
  const { user_id, subgroup_id, main_group_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  if (!subgroup_id) {
    return res.status(400).json({ message: 'Subgroup ID not provided' });
  }

  if (!main_group_id) {
    return res.status(400).json({ message: 'Main Group ID not provided' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Failed to connect to MySQL' });
    }

    connection.query(
      'INSERT INTO subscribedsubgroups (user_id, group_id, main_group_id) VALUES (?, ?, ?)',
      [user_id, subgroup_id, main_group_id],
      (error, results) => {
        connection.release();

        if (error) {
          console.error('Error subscribing user to subgroup:', error);
          return res
            .status(500)
            .json({ message: 'Error while subscribing user to subgroup' });
        }

        return res.status(200).json({ message: 'User subscribed to subgroup' });
      }
    );
  });
};

// Retrieve all joined groups (main and subgroups) for a user
exports.getSubscribedGroups = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Failed to connect to MySQL' });
    }

    const queryMainGroups =
      'SELECT * FROM subscribedmaingroups WHERE user_id = ?';
    const querySubGroups =
      'SELECT * FROM subscribedsubgroups WHERE user_id = ?';

    connection.query(queryMainGroups, [userId], (errorMain, resultsMain) => {
      if (errorMain) {
        console.error('Error retrieving joined main groups:', errorMain);
        return res
          .status(500)
          .json({ message: 'Error while retrieving joined main groups' });
      }

      connection.query(querySubGroups, [userId], (errorSub, resultsSub) => {
        connection.release();

        if (errorSub) {
          console.error('Error retrieving joined subgroups:', errorSub);
          return res
            .status(500)
            .json({ message: 'Error while retrieving joined subgroups' });
        }

        const response = {
          mainGroups: resultsMain,
          subGroups: resultsSub,
        };

        return res.status(200).json(response);
      });
    });
  });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Failed to connect to MySQL' });
    }

    const query = 'SELECT * FROM users WHERE user_id = ?';

    connection.query(query, [userId], (error, results) => {
      connection.release();

      if (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({ message: 'Error while retrieving user' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];

      // Add the image path or filename to the user object
      /* const userWithImage = {
        ...user,
        image: user.profile_image ? `${user.profile_image}` : null,
      };

      return res.status(200).json(userWithImage); */

      // Convert the blob profile_image to a base64 string
      const profileImage = user.profile_image
        ? user.profile_image.toString('base64')
        : null;

      // Create a new user object with the image as a base64 string
      const userWithImage = {
        ...user,
        profile_image: profileImage,
      };

      return res.status(200).json(userWithImage);
    });
  });
};

// Update user by ID
exports.updateUserById = (req, res) => {
  const { userId } = req.params;
  const { name, email, phone_number, birthday, biography } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Failed to connect to MySQL' });
    }

    const query =
      'UPDATE users SET name = ?, email = ?, phone_number = ?, birthday = ?, biography = ? WHERE user_id = ?';

    connection.query(
      query,
      [name, email, phone_number, birthday, biography, userId],
      (error, results) => {
        connection.release();

        if (error) {
          console.error('Error updating user:', error);
          return res.status(500).json({ message: 'Error while updating user' });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated successfully' });
      }
    );
  });
};
