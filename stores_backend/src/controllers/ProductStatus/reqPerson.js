const { get_database, post_database } = require("../../config/db_utils");

exports.get_ReqPerson = async (req, res) => {
  const {req_person} = req.query;
  if (!req_person) {
    return res.status(400).json({ error: "Person ID is required" });
  }
  try {
    const query = `
        SELECT tasks.id, task_id,users.name ,req_person, product_details, quantity, received_qty, task_date , tasks.status
        FROM tasks
        INNER JOIN users
        ON tasks.req_person = users.id
        WHERE req_person =? 
        `;
    const rperson = await get_database(query, [req_person]);
    const formatdate = (dateString)=>{
      const date = new  Date(dateString)
      return date.toLocaleDateString()+ ' ' + date.toLocaleTimeString()

    }
    rperson.forEach(task => {
      task.task_date = formatdate(task.task_date)
      
    });
    res.json(rperson);
  } catch (err) {
    console.error("Error fetching Task Status", err);
    res.status(500).json({ error: "Error fetching task status" });
  }
};



