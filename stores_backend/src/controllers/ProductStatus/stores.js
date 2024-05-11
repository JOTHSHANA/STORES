const { get_database, post_database } = require("../../config/db_utils");

// get stores
exports.get_stores = async (req, res) => {
  try {
    const query = `
    SELECT apex.apex_id,apex.amount AS apex_amount,
    tasks.task_id,users.name ,task_type.type,
    req_person, product_details,purchase_order,ref_no, 
    remaining_amount, quantity,received_qty, required_qty, 
    tasks.amount, advance_amount, task_date, tasks.status 
    FROM tasks
    INNER JOIN apex
    ON tasks.apex = apex.id
    INNER JOIN users
    ON tasks.req_person = users.id
    INNER JOIN task_type
    ON tasks.task_type = task_type.id
    WHERE tasks.status IN ('4','5', '6', '7', '9', '10')
     
    `;
    const taskstatus = await get_database(query);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };

    taskstatus.forEach((task) => {
      task.task_date = formatDate(task.task_date);
    });
    res.json(taskstatus);
  } catch (err) {
    console.error("Error fetching Stores Task Status", err);
    res.status(500).json({ error: "Error fetching Stores task status" });
  }
};

exports.update_stores_1 = async (req, res) => {
  const id = req.query.id;
  const purchase_order = req.body;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.stores_app_1 = CURRENT_TIMESTAMP,
    tasks.status = '5' ,
    tasks.purchase_order =?
    WHERE task_id= ?
    `;
    await post_database(query, [id, purchase_order]);
    res.json({ message: " stores 1 Tasks added successfully" });
  } catch (err) {
    console.error("Error updating  Stores 1");
  }
};

exports.update_stores_2 = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.stores_app_2 = CURRENT_TIMESTAMP,
    tasks.status = '6' 
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: " stores 2 Tasks added successfully" });
  } catch (err) {
    console.error("Error updating  Stores 2");
  }
};

exports.update_stores_3 = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.stores_app_3 = CURRENT_TIMESTAMP,
    tasks.status = '7' 
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: " stores 3 Tasks added successfully" });
  } catch (err) {
    console.error("Error updating  Stores 3");
  }
};

exports.update_stores_products = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.stores_app_products = CURRENT_TIMESTAMP,
    tasks.status = '8' 
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: " stores  Tasks added successfully" });
  } catch (err) {
    console.error("Error updating  Stores ");
  }
};

exports.update_stores_bill = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.stores_status_bill = CURRENT_TIMESTAMP,
    tasks.status = '10' 
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: " stores bill Tasks added successfully" });
  } catch (err) {
    console.error("Error updating  Stores bill");
  }
};

exports.update_stores_sent_bill = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
    UPDATE date_completion ,tasks
    SET date_completion.stores_status_sent__bill = CURRENT_TIMESTAMP,
    tasks.status = '11' 
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: " stores bill sent Tasks added successfully" });
  } catch (err) {
    console.error("Error updating  Stores bill");
  }
};

