const { get_database, post_database } = require("../../config/db_utils");

exports.get_type = async (req, res) => {
 
  try {
    const query = `
    SELECT  id, type FROM task_type 
   WHERE status = '1'
        `;
    const type = await get_database(query);
    res.json(type);
  } catch (err) {
    console.error("Error fetching Task Type Status", err);
    res.status(500).json({ error: "Error fetching task type status" });
  }
};
