const { get_database, post_database } = require("../../config/db_utils");

exports.get_ReqPerson = async (req, res) => {
  const {req_person} = req.query;
  if (!req_person) {
    return res.status(400).json({ error: "Person ID is required" });
  }
  try {
    const query = `
        SELECT task_id, product_details, quantity, available_qty, date , status
        FROM products WHERE req_person =?
        `;
    const mteam = await get_database(query, [req_person]);
    res.json(mteam);
  } catch (err) {
    console.error("Error fetching Task Status", err);
    res.status(500).json({ error: "Error fetching task status" });
  }
};


exports.update_PersonTask = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
        UPDATE products
        SET status = '3'
        WHERE id =?
        `;
    const success_message = await post_database(
      query,
      [id],
      "Req Person Updation Successfull"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating ReqPerson status");
  }
};
