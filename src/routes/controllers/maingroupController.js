const pool = require('../config/database');

exports.getMainGroupsWithSubgroups = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }

    const query = `
      SELECT 
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
      LEFT JOIN subgroups ON maingroup.group_id = subgroups.main_group_id
    `;

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.error('Error querying MySQL:', error);
        return res
          .status(500)
          .json({ error: 'Failed to fetch data from MySQL' });
      }

      // Process the results and return the response
      const mainGroups = {};
      results.forEach((row) => {
        const {
          main_group_id,
          main_group_name,
          subgroup_id,
          subgroup_name,
          title_image,
          members,
          events,
          threads,
          created_at,
        } = row;

        if (!mainGroups[main_group_id]) {
          mainGroups[main_group_id] = {
            main_group_id,
            main_group_name,
            subgroups: [],
          };
        }

        mainGroups[main_group_id].subgroups.push({
          subgroup_id,
          subgroup_name,
          title_image,
          members,
          events,
          threads,
          created_at,
        });
      });

      const response = Object.values(mainGroups);
      res.json(response);
    });
  });
};
