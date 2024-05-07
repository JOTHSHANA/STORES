const { query } = require("express");
const { get_database, post_database } = require("../../config/db_utils");

exports.get_ReqPerson = async (req, res) => {
  const { req_person } = req.query;
  if (!req_person) {
    return res.status(400).json({ error: "Person ID is required" });
  }
  try {
    const query = `
    SELECT  tasks.task_id,users.name ,task_type.type, req_person, product_details, quantity, amount, advance_amount, task_date, tasks.status 
    FROM tasks
    INNER JOIN users
    ON tasks.req_person = users.id
    INNER JOIN task_type
    ON tasks.task_type = task_type.id
     WHERE req_person =?
     AND tasks.status = '1'||'5'||'7'||'10'
        `;
    const rperson = await get_database(query, [req_person]);
    res.json(rperson);
  } catch (err) {
    console.error("Error fetching Task Status", err);
    res.status(500).json({ error: "Error fetching task status" });
  }
};

exports.post_ReqPerson = async (req, res) => {
  const {
    req_person,
    task_type,
    product_details,
    amount,
    advance_amount,
    quantity,
  } = req.body;

  if (!req_person || !task_type || !product_details || !quantity || !amount) {
    return res.status(400).json({
      error: "Fields are required!",
    });
  }

  try {
    const taskInsertQuery = `
      INSERT INTO tasks (req_person, task_type, product_details, amount, advance_amount, quantity, task_date)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);
    `;
    await post_database(taskInsertQuery, [
      req_person,
      task_type,
      product_details,
      amount,
      advance_amount,
      quantity,
    ]);
    const taskIdQuery = `SELECT task_id FROM tasks ORDER BY task_id DESC LIMIT 1`;
    const taskIdResult = await get_database(taskIdQuery);
    console.log(taskIdResult);
    if (
      !taskIdResult ||
      taskIdResult.length === 0 ||
      !taskIdResult[0].task_id
    ) {
      return res.status(500).json({ error: "Unable to fetch taskId" });
    }

    const taskId = taskIdResult[0].task_id;

    const dateCompletionQuery = `
      INSERT INTO date_completion (task) VALUES (?);
    `;
    await post_database(dateCompletionQuery, [taskId]);

    res.json({ message: "Tasks added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

exports.update_advance = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.rp_app_advance = CURRENT_TIMESTAMP,
    tasks.status = '6' 
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: "req_person Advance Tasks added successfully" });
  } catch (err) {
    console.error("Error updating req_person Advance");
  }
};


exports.update_stores  = async(req, res)=>{
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.rp_app_stores = CURRENT_TIMESTAMP,
    tasks.status = '8' 
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: "Req_person stores Tasks added successfully" });
  } catch (err) {
    console.error("Error updating req_person Stores");
  }
}

exports.update_accounts  = async(req, res)=>{
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.rp_app_acc = CURRENT_TIMESTAMP,
    tasks.status = '11' 
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: "Req_person accounts Tasks added successfully" });
  } catch (err) {
    console.error("Error updating req_person Accounts");x
  }
}