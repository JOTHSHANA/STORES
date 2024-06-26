const { get_database, post_database } = require("../../config/db_utils");

exports.get_Taskstatus = async (req, res) => {
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
    WHERE tasks.status IN ('1','2','3','4','5','6','7','8','9','10','11','12','13','14')
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

exports.get_history = async(req, res)=>{
  try{
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
    WHERE tasks.status IN ('14')
    `
    const history = await get_database(query)
    const formatDate = (dateString)=>{
      const date = new Date(dateString);
      return date.toLocaleDateString()+ " "+date.toLocaleTimeString()

    }
    history.forEach(his =>{
      his.task_date = formatDate(his.task_date)
    })
    res.json(history)
  }catch(err){
    console.error("Error fetching History tasks Status", err);
    res.status(500).json({ error: "Error fetching History task status" });
  }
}