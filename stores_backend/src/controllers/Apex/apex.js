const { get_database, post_database } = require("../../config/db_utils");

exports.get_apex = async (req, res) => {
  const user = req.query;
  if (!user) {
    return res.status(400).json({ error: "User id is required" });
  }
  try {
    const query = `
    SELECT id, apex_id AS apex
    FROM apex
    WHERE user = ?
    AND status = '1'
        `;
    const apex = await get_database(query, [user]);
    res.json(apex);
  } catch (err) {
    console.error("Error fetching Apex dropdown", err);
    res.status(500).json({ error: "Error fetching apex id" });
  }
};

exports.post_apex = async (req, res) => {
  const user = req.body;
  if (!user) {
    return res.status(400).json({ error: "User id is required" });
  }
  try {
    const query = `
        INSERT INTO apex(apex_id, user)
        VALUES (? ,?)
        `;
    await post_database(query, [user]);
    res.status(200).json({ message: "Apex id Posted successfully" });
  } catch (err) {
    console.error("Error to post apex id");
    res.status(500).json({ error: "Error to post Apex id" });
  }
};

exports.update_apex = async (req, res) => {
  const user = req.query;
  if (!user) {
    return res.status(400).json({ error: "User id is required" });
  }
  try {
    const query = `
        UPDATE apex 
        SET apex_id =?
        WHERE user = ?
        `;
    await post_database(query, [user]);
    res.status(200).json({ message: "Apex id Updated successfully" });
  } catch (err) {
    console.error("Error to update apex id");
    res.status(500).json({ error: "Error to Update Apex id" });
  }
};

exports.delete_apex = async (req, res) => {
  const id = req.query;
  if (!user) {
    return res.status(400).json({ error: " id is required" });
  }
  try {
    const query = `
        UPDATE apex
        SET status = '0'
        WHERE id =?
        `;
    await post_database(query, [id]);
    res.status(200).json({ message: "Apex id Deleted successfully" });
  } catch (err) {
    console.error("Error to deleted apex id");
    res.status(500).json({ error: "Error to deleted Apex id" });
  }
};
