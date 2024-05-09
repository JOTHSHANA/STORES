const { get_database, post_database } = require("../../config/db_utils");

// get
exports.get_pteam = async (req, res) => {
  try {
    const query = `
    SELECT  tasks.task_id,users.name , req_person, product_details, quantity, task_date, tasks.status
    FROM tasks
    INNER JOIN users
    ON tasks.req_person = users.id
     WHERE tasks.status IN ('1', '11') 
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
    console.error("Error fetching Pteam Task Status", err);
    res.status(500).json({ error: "Error fetching Pteam task status" });
  }
};

exports.update_pteam = async (req, res) => {
  const id = req.query;
  if (!id) {
    return res.status(400).json({ error: "task is required" });
  }
  try {
    const query = `
    UPDATE date_completion, tasks
    SET date_completion.pteam_app = CURRENT_TIMESTAMP
    AND tasks.status = '2'
    WHERE tasks.task_id = ?

    `;
    await post_database(query, [id]);
    res.json({ message: "PTeam updated successfull" });
  } catch (err) {
    console.error("Error Updating Pteam task", err);
  }
};

exports.update_Close_PurchaseBill = async (req, res) => {
  const id = req.query;
  if (!id) {
    return res.status(400).json({ error: "task is required" });
  }
  try {
    const query = `
    UPDATE date_completion, tasks
    SET date_completion.pteam_task_close = CURRENT_TIMESTAMP
    AND tasks.status = '13'
    WHERE tasks.task_id = ?

    `;
    await post_database(query, [id]);
    res.json({ message: "PTeam close updated successfull" });
  } catch (err) {
    console.error("Error Updating Pteam close task", err);
  }
};

exports.update_Partial_PurchaseBill = async (req, res) => {
  const id = req.query;
  if (!id) {
    return res.status(400).json({ error: "task is required" });
  }
  try {
    const query = `
    UPDATE date_completion, tasks
    SET date_completion.pteam_task_close = CURRENT_TIMESTAMP
    AND tasks.status = '12'
    WHERE tasks.task_id = ?

    `;
    await post_database(query, [id]);
    res.json({ message: "PTeam Partail updated successfull" });
  } catch (err) {
    console.error("Error Updating Partial close task", err);
  }
};
