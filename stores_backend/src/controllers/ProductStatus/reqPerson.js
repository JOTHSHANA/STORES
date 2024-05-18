const { get_database, post_database } = require("../../config/db_utils");

exports.get_ReqPerson = async (req, res) => {
  const { req_person } = req.query;
  if (!req_person) {
    return res.status(400).json({ error: "Person ID is required" });
  }
  try {
    const query = `
    SELECT apex.apex_id,apex.amount AS apex_amount,
    users.name, tasks.* ,task_type.type
    FROM tasks
    INNER JOIN apex
    ON tasks.apex = apex.id
    INNER JOIN users
    ON tasks.req_person = users.id
    INNER JOIN task_type
    ON tasks.task_type = task_type.id
    WHERE req_person =? AND tasks.status != 0
     `;
    const rperson = await get_database(query, [req_person]);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString() + "  " + date.toLocaleTimeString();
    };
    rperson.forEach((rp) => {
      rp.task_date = formatDate(rp.task_date);
    });
    res.json(rperson);
  } catch (err) {
    console.error("Error fetching Task Status", err);
    res.status(500).json({ error: "Error fetching task status" });
  }
};

exports.get_App_ReqPerson = async (req, res) => {
  const { req_person } = req.query;
  if (!req_person) {
    return res.status(400).json({ error: "Person ID is required" });
  }
  try {
    const query = `
    SELECT apex.apex_id,apex.amount AS apex_amount,
    users.name, tasks.* ,task_type.type
    FROM tasks
    INNER JOIN apex
    ON tasks.apex = apex.id
    INNER JOIN users
    ON tasks.req_person = users.id
    INNER JOIN task_type
    ON tasks.task_type = task_type.id
    WHERE req_person =?
     AND tasks.status IN ('3', '8', '12')
        `;
    const rperson = await get_database(query, [req_person]);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString() + "  " + date.toLocaleTimeString();
    };
    rperson.forEach((rp) => {
      rp.task_date = formatDate(rp.task_date);
    });
    res.json(rperson);
  } catch (err) {
    console.error("Error fetching Task Status", err);
    res.status(500).json({ error: "Error fetching task status" });
  }
};

exports.post_ReqPerson = async (req, res) => {
  const {
    apex_id,
    task_id,
    req_person,
    task_type,
    product_details,
    amount,
    advance_amount,
    quantity,
  } = req.body;

  if (
    !apex_id ||
    !task_id ||
    !req_person ||
    !task_type ||
    !product_details ||
    !quantity ||
    !amount
  ) {
    return res.status(400).json({
      error: "Fields are required!",
    });
  }

  try {
    const taskInsertQuery = `
      INSERT INTO tasks (apex,task_id, req_person, task_type, product_details, amount, advance_amount, quantity,required_qty, task_date)
      VALUES (?,?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);
    `;
  
    await post_database(taskInsertQuery, [
      apex_id,
      task_id,
      req_person,
      task_type,
      product_details,
      amount,
      advance_amount,
      quantity,
      quantity
    ]);
    const taskIdQuery = `SELECT id FROM tasks ORDER BY task_id DESC LIMIT 1`;
    const taskIdResult = await get_database(taskIdQuery);
    console.log(taskIdResult);
    if (!taskIdResult || taskIdResult.length === 0 || !taskIdResult[0].id) {
      return res.status(500).json({ error: "Unable to fetch taskId" });
    }

    const taskId = taskIdResult[0].id;

    const dateCompletionQuery = `
      INSERT INTO date_completion (task) VALUES (?);
    `;
   
    await post_database(dateCompletionQuery, [taskId]);

    res.json({ message: "Tasks  added successfully" });
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
    tasks.status = '4'
    WHERE date_completion.task = ?
    `;
    await post_database(query, [id]);
    res.json({ message: "req_person Advance Tasks added successfully" });
  } catch (err) {
    console.error("Error updating req_person Advance");
  }
};

exports.update_stores = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.rp_app_stores = CURRENT_TIMESTAMP,
    tasks.status = '9'
    WHERE date_completion.task = ?
    `;
    await post_database(query, [id]);
    res.json({ message: "Req_person stores Tasks added successfully" });
  } catch (err) {
    console.error("Error updating req_person Stores");
  }
};

exports.update_par_stores = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.par_rp_app_stores = CURRENT_TIMESTAMP,
    tasks.status = '16'
    WHERE date_completion.task = ?
    `;
    await post_database(query, [id]);
    res.json({ message: "Req_person stores Tasks added successfully" });
  } catch (err) {
    console.error("Error updating req_person Stores");
  }
};

exports.update_accounts = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.rp_app_acc = CURRENT_TIMESTAMP,
    tasks.status = '13'
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: "Req_person accounts Tasks added successfully" });
  } catch (err) {
    console.error("Error updating req_person Accounts");
  }
};

exports.update_par_accounts = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.par_rp_app_acc = CURRENT_TIMESTAMP,
    tasks.status = '18'
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: "Req_person accounts Tasks added successfully" });
  } catch (err) {
    console.error("Error updating req_person Accounts");
  }
};

exports.get_user_history = async (req, res) => {
  const req_person = req.query;
  if (!req_person) {
    return res.status(400).json({ error: "Id is required" });
  }
  try {
    const query = `
    SELECT apex.apex_id,apex.amount AS apex_amount,
    users.name,users.role_id,task_type.type,tasks.*
    FROM tasks
    INNER JOIN apex
    ON tasks.apex = apex.id
    INNER JOIN users
    ON tasks.req_person = users.id 
    INNER JOIN task_type
    ON tasks.task_type = task_type.id
    WHERE req_person =?
    AND tasks.status IN ('14')
    AND users.role_id IN ('1')
    `;
    const history = await get_database(query, [req_person]);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };
    history.forEach((his) => {
      his.task_date = formatDate(his.task_date);
    });
    res.json(history);
  } catch (err) {
    console.error("Error fetching History tasks Status", err);
    res.status(500).json({ error: "Error fetching History task status" });
  }
};
