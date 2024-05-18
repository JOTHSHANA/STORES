const { get_database, post_database } = require("../../config/db_utils");

// get
exports.get_pteam = async (req, res) => {
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
     WHERE tasks.status IN ('1', '13', '18')
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

exports.update_advance_pteam = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task is required" });
  }
  try {
    const query = `
    UPDATE date_completion, tasks
    SET date_completion.pteam_app = CURRENT_TIMESTAMP,
    tasks.status = '2',
    tasks.indicator = '2'
    WHERE date_completion.task = ?

    `;
    await post_database(query, [id]);
    res.json({ message: "PTeam updated successfull" });
  } catch (err) {
    console.error("Error Updating Pteam task", err);
  }
};

exports.update_pteam = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task is required" });
  }
  try {
    const query = `
    UPDATE date_completion, tasks
    SET date_completion.pteam_app = CURRENT_TIMESTAMP,
    tasks.status = '3',
    tasks.indicator = '2'
    WHERE date_completion.task = ?

    `;
    await post_database(query, [id]);
    res.json({ message: "PTeam updated successfull" });
  } catch (err) {
    console.error("Error Updating Pteam task", err);
  }
};

exports.update_Close_PurchaseBill = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task is required" });
  }
  try {
    const query = `
    UPDATE date_completion, tasks
    SET date_completion.pteam_task_close = CURRENT_TIMESTAMP,
    tasks.status = '14'
    WHERE task_id = ?

    `;
    await post_database(query, [id]);
    res.json({ message: "PTeam close updated successfull" });
  } catch (err) {
    console.error("Error Updating Pteam close task", err);
  }
};

exports.update_Partial_PurchaseBill = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task is required" });
  }
  try {
    const query = `
    UPDATE date_completion, tasks
    SET date_completion.pteam_par_task_close = CURRENT_TIMESTAMP,
    tasks.status = '20'
    WHERE task_id = ?
    `;
    await post_database(query, [id]);
    res.json({ message: "PTeam Partial updated successfull" });
  } catch (err) {
    console.error("Error Updating Partial close task", err);
  }
};