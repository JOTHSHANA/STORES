const { get_database, post_database } = require("../../config/db_utils");

exports.get_Taskstatus = async (req, res) => {
  try {
    const query = `
        SELECT  tasks.id,task_id,users.name , req_person, product_details, quantity, received_qty, task_date, tasks.status 
        FROM tasks
        INNER JOIN users
        ON tasks.req_person = users.id
         WHERE tasks.status = '1' || '2'|| '3'||'4'||'5'||'6'||'7'
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
    console.error("Error fetching Task Status", err);
    res.status(500).json({ error: "Error fetching task status" });
  }
};

exports.get_user = async (req, res) => {
  try {
    const query = `
        SELECT id , name FROM users
        `;
    const user = await get_database(query);
    res.json(user);
  } catch (err) {
    console.error("Error Fetching User", err);
    res.status(500).json({ error: "Error fetching user" });
  }
};
