const pool = require('../config/database');

exports.getMainGroupsWithSubgroups = (req, res) => {
  // eslint-disable-next-line consistent-return
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }

    const query = `
      SELECT 
        maingroup.group_id AS mainGroupId, 
        maingroup.name AS mainGroupName, 
        subgroups.group_id AS subgroupId, 
        subgroups.name AS subgroupName, 
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
          mainGroupId,
          mainGroupName,
          subgroupId,
          subgroupName,
          title_image: titleImage,
          members,
          events,
          threads,
          created_at: createdAt,
        } = row;

        if (!mainGroups[mainGroupId]) {
          mainGroups[mainGroupId] = {
            mainGroupId,
            mainGroupName,
            subgroups: [],
          };
        }

        if (subgroupId) {
          // Only add subgroups if subgroupId exists
          mainGroups[mainGroupId].subgroups.push({
            subgroupId,
            subgroupName,
            titleImage, // camel case
            members,
            events,
            threads,
            createdAt, // camel case
          });
        }
      });

      const response = Object.values(mainGroups);
      console.log(`responseObject:${response}`);
      return res.json(response); // Return the response
    });
  });
};
