const { get_database, post_database } = require("../../config/db_utils");

// get
exports.get_pteam = async (req, res) => {
  try {
    const query = `
    SELECT  tasks.id,task_id,users.name , req_person, product_details, quantity, received_qty, task_date, tasks.status
    FROM tasks
    INNER JOIN users
    ON tasks.req_person = users.id
     WHERE tasks.status = '1' AND delayed_status = '0'
    `;
    const taskstatus = await get_database(query);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    taskstatus.forEach(task => {
      task.task_date = formatDate(task.task_date);
    });
    res.json(taskstatus);
  } catch (err) {
    console.error("Error fetching Pteam Task Status", err);
    res.status(500).json({ error: "Error fetching Pteam task status" });
  }
};

// post task

// pteam ---- req person



