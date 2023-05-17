const pool = require('../config/database');

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
