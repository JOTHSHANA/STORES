const { get_database, post_database } = require("../../config/db_utils");

exports.get_Admin = async (req, res) => {
  try {
    const query = `
    SELECT  tasks.task_id,users.name,task_type.type, req_person, product_details, quantity, amount, advance_amount, task_date, tasks.status 
    FROM tasks
    INNER JOIN users
    ON tasks.req_person = users.name
    INNER JOIN task_type
    ON tasks.task_type = task_type.id
    WHERE tasks.status = '0'||'1' || '2'|| '3'||'4'||'5'||'6'||'7'||'8'||'9'||'10'||'11'||'12'||'13
 `;
    const admin = await get_database(query);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };

    admin.forEach((task) => {
      task.task_date = formatDate(task.task_date);
    });
    res.json(admin);
  } catch (err) {
    console.error("Error fetching Admin task", err);
    res.status(500).json({ error: "Error fetching Admin Task" });
  }
};

exports.update_AdminTask = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task's id is required" });
  }
  try {
    const query = `
        UPDATE tasks
        SET status = '1'
        WHERE id =?
        `;
    const success_message = await post_database(
      query,
      [id],
      "Admin Updation Successfull"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating Admin status");
  }
};
