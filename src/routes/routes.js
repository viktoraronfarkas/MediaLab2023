// server.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', // Your connection adress (localhost).
  port: 3306,
  user: 'root', // Your database's username.
  password: process.env.DB_PASSWORD,
  database: 'node_cc201013_1070',
  connectionLimit: 10,
});

app.get('/maingroup', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }

    connection.query(
      `SELECT 
        maingroup.group_id AS main_group_id, 
        maingroup.name AS main_group_name, 
        subgroups.group_id AS subgroup_id, 
        subgroups.name AS subgroup_name, 
        subgroups.title_image, 
        subgroups.members, 
        subgroups.events, 
        subgroups.threads, 
        subgroups.created_at 
      FROM maingroup 
      LEFT JOIN subgroups 
      ON maingroup.group_id = subgroups.main_group_id`,
      (error, results) => {
        connection.release();

        if (error) {
          console.error('Error querying MySQL:', error);
          return res
            .status(500)
            .json({ error: 'Failed to fetch data from MySQL' });
        }

        const mainGroupsWithSubgroups = results.reduce((acc, row) => {
          const existingGroup = acc.find(
            (group) => group.group_id === row.main_group_id
          );
          if (existingGroup) {
            existingGroup.subgroups.push({
              subgroup_id: row.subgroup_id,
              name: row.subgroup_name,
              title_image: row.title_image,
              members: row.members,
              events: row.events,
              threads: row.threads,
              created_at: row.created_at,
              caption: row.caption,
              Description: row.Description,
            });
          } else {
            acc.push({
              group_id: row.main_group_id,
              name: row.main_group_name,
              subgroups: [
                {
                  subgroup_id: row.subgroup_id,
                  name: row.subgroup_name,
                  title_image: row.title_image,
                  members: row.members,
                  events: row.events,
                  threads: row.threads,
                  created_at: row.created_at,
                  caption: row.caption,
                  Description: row.Description,
                },
              ],
            });
          }
          return acc;
        }, []);

        res.json(mainGroupsWithSubgroups);
      }
    );
  });
});

app.get('/subgroup/:subgroupId/posts', (req, res) => {
  const { subgroupId } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }

    connection.query(
      'SELECT * FROM posts WHERE group_id = ?',
      [subgroupId],
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
});

app.get('/subgroup/:subgroupId/events', (req, res) => {
  const { subgroupId } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }

    connection.query(
      'SELECT * FROM events WHERE group_id = ?',
      [subgroupId],
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
});
app.get('/user/:userId/subscribed-groups', (req, res) => {
  const { userId } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }

    connection.query(
      `SELECT 
        main_group.group_id AS main_group_id, 
        main_group.name AS main_group_name, 
        main_group.title_image AS main_group_title_image, 
        subgroup.group_id AS subgroup_id, 
        subgroup.name AS subgroup_name, 
        subgroup.title_image AS subgroup_title_image
      FROM subscribedmaingroups AS submaingroup
      INNER JOIN maingroup AS main_group ON submaingroup.main_group_id = main_group.group_id
      LEFT JOIN subgroups AS subgroup ON main_group.group_id = subgroup.main_group_id
      WHERE submaingroup.user_id = ?`,
      [userId],
      (error, results) => {
        connection.release();

        if (error) {
          console.error('Error querying MySQL:', error);
          return res
            .status(500)
            .json({ error: 'Failed to fetch data from MySQL' });
        }

        const subscribedMainGroups = results.reduce((acc, row) => {
          const existingGroup = acc.find(
            (group) => group.group_id === row.main_group_id
          );
          if (existingGroup) {
            if (row.subgroup_id) {
              existingGroup.subgroups.push({
                subgroup_id: row.subgroup_id,
                name: row.subgroup_name,
                title_image: row.subgroup_title_image,
              });
            }
          } else {
            acc.push({
              group_id: row.main_group_id,
              name: row.main_group_name,
              title_image: row.main_group_title_image,
              subgroups: row.subgroup_id
                ? [
                    {
                      subgroup_id: row.subgroup_id,
                      name: row.subgroup_name,
                      title_image: row.subgroup_title_image,
                    },
                  ]
                : [],
            });
          }
          return acc;
        }, []);

        res.json(subscribedMainGroups);
      }
    );
  });
});
app.post('/subgroup', (req, res) => {
  const { subgroup_name, main_group_id } = req.body;

  if (!subgroup_name) {
    return res.status(400).json({ message: 'Subgroup name not provided' });
  }

  if (!main_group_id) {
    return res.status(400).json({ message: 'Main group ID not provided' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Failed to connect to MySQL' });
    }

    connection.query(
      'SELECT * FROM subgroups WHERE name = ?',
      [subgroup_name],
      (error, results) => {
        if (error) {
          connection.release();
          console.error('Error querying MySQL:', error);
          return res
            .status(500)
            .json({ message: 'Error while creating subgroup' });
        }

        if (results.length > 0) {
          connection.release();
          return res
            .status(409)
            .json({ message: 'Subgroup with the same name already exists' });
        }

        connection.query(
          'INSERT INTO subgroups (name, main_group_id) VALUES (?, ?)',
          [subgroup_name, main_group_id],
          (error, results) => {
            connection.release();

            if (error) {
              console.error('Error creating subgroup:', error);
              return res
                .status(500)
                .json({ message: 'Error while creating subgroup' });
            }

            return res.status(200).json({ message: 'Subgroup created' });
          }
        );
      }
    );
  });
});
// Subscribe a user to a main group
app.post('/subscribe/maingroup', (req, res) => {
  const { user_id, main_group_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  if (!main_group_id) {
    return res.status(400).json({ message: 'Main group ID not provided' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Failed to connect to MySQL' });
    }

    connection.query(
      'INSERT INTO subscribedmaingroups (user_id, main_group_id) VALUES (?, ?)',
      [user_id, main_group_id],
      (error, results) => {
        connection.release();

        if (error) {
          console.error('Error subscribing user to main group:', error);
          return res
            .status(500)
            .json({ message: 'Error while subscribing user to main group' });
        }

        return res
          .status(200)
          .json({ message: 'User subscribed to main group' });
      }
    );
  });
});

// Subscribe a user to a subgroup
app.post('/subscribe/subgroup', (req, res) => {
  const { user_id, subgroup_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  if (!subgroup_id) {
    return res.status(400).json({ message: 'Subgroup ID not provided' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Failed to connect to MySQL' });
    }

    connection.query(
      'INSERT INTO subscribedsubgroups (user_id, group_id) VALUES (?, ?)',
      [user_id, subgroup_id],
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
});
app.post('/subgroup/posts', (req, res) => {
  const { text, subgroup_id, user_id } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Post text not provided' });
  }

  if (!user_id) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ error: 'Failed to connect to MySQL' });
    }

    connection.query(
      'INSERT INTO posts (text, group_id, user_id) VALUES (?, ?, ?)',
      [text, subgroup_id, user_id],
      (error, results) => {
        connection.release();

        if (error) {
          console.error('Error creating post:', error);
          return res.status(500).json({ message: 'Error while creating post' });
        }

        return res.status(200).json({ message: 'Post created' });
      }
    );
  });
});

app.post('/subgroup/events', (req, res) => {
  const { title, description, subgroup_id, user_id } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Event title not provided' });
  }

  if (!user_id) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ error: 'Failed to connect to MySQL' });
    }

    connection.query(
      'INSERT INTO events (title, description, group_id, user_id) VALUES (?, ?, ?, ?)',
      [title, description, subgroup_id, user_id],
      (error, results) => {
        connection.release();

        if (error) {
          console.error('Error creating event:', error);
          return res
            .status(500)
            .json({ message: 'Error while creating event' });
        }

        return res.status(200).json({ message: 'Event created' });
      }
    );
  });
});

app.post('/signup', (req, res) => {
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
              .json({ message: 'Error while creating user' });
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
});

app.post('/login', (req, res) => {
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
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
