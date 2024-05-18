const { get_database, post_database } = require("../../config/db_utils");

// get stores
exports.get_stores = async (req, res) => {
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
  const received_qty = req.body.received_qty;
  const task_id = req.query.task_id;
  console.log(id);
  console.log(received_qty);
  if (!id || !received_qty) {
    return res.status(400).json({ error: "task id and quantity is required" });
  }
  try {
    const chkQuantity = `
    SELECT quantity , required_qty FROM tasks WHERE task_id = ? ORDER BY id DESC
    `;
    const result = await get_database(chkQuantity, [task_id]);
    const currentQuantity = result[0].quantity || 0;
    const required_qty = result[0].required_qty || 0;
    console.log(required_qty);
    const remaining_quantity = required_qty - received_qty;

    const partialTask = `SELECT * FROM tasks 
    WHERE task_id =?
    AND partial_task = '1'
    ORDER BY id DESC 
    LIMIT 1
    `
    const partialResult = await get_database(partialTask, [task_id])
    const partialExists = partialResult.length > 0
    console.log(partialExists);
    console.log(partialResult.length)

    if ((received_qty == required_qty  ) && !partialExists){
      const query = `
    UPDATE date_completion ,tasks
    SET date_completion.stores_app_products = CURRENT_TIMESTAMP,
    tasks.status = '8', 
    tasks.indicator = '3',
    tasks.received_qty  = ?,
    tasks.required_qty = ?
    WHERE tasks.id = ?
    `;
      await post_database(query, [received_qty, remaining_quantity, id]);
   
  }
     else if ( (received_qty <= required_qty ) && partialExists) {
      const lastEntryQuery = `
          SELECT apex, task_id,req_person,task_type, product_details, amount, purchase_order, ref_no, advance_amount, remaining_amount, quantity, received_qty, required_qty
          FROM tasks
          WHERE task_id = ?
          ORDER BY id DESC
          LIMIT 1;
        `;
      const lastEntryResult = await get_database(lastEntryQuery, [task_id]);
      const lastEntry = lastEntryResult[0];
      console.log(lastEntry);
      console.log(remaining_quantity);
      if (lastEntry) {
        const insertQuery = `
            INSERT INTO tasks (apex, task_id,req_person,task_type, product_details, amount, purchase_order, ref_no, advance_amount, remaining_amount, quantity, received_qty, required_qty, task_date, status, indicator,partial_task)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, '8', '3','1');
          `;
        const insertParams = [
          lastEntry.apex,
          lastEntry.task_id,
          lastEntry.req_person,
          lastEntry.task_type,
          lastEntry.product_details,
          lastEntry.amount,
          lastEntry.purchase_order,
          lastEntry.ref_no,
          lastEntry.advance_amount,
          lastEntry.remaining_amount,
          required_qty,
          received_qty,
          remaining_quantity,
        ];
        console.log(insertParams);

        const updateQuery = `
          UPDATE tasks 
          SET status = '0'
          WHERE id =?
          `;

        await post_database(insertQuery, insertParams);
        await post_database(updateQuery, [id]);
      } else {
        return res
          .status(404)
          .json({ error: "No existing task record found to duplicate" });
      }
    }
    else{
      return res.status(400).json({message:"Quantity Limit exceeded "})
    }

    res.json({ message: "Stores Tasks updated successfully" });
  } catch (err) {
    console.error("Error updating Stores ");
    return res.status(500).json({ message: "Error Updating Stores Task " });
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
    tasks.status = '11' ,
    tasks.indicator = '4'
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: " stores bill sent Tasks added successfully" });
  } catch (err) {
    console.error("Error updating  Stores bill");
  }
};
