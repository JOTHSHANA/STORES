const { get_database, post_database } = require("../../config/db_utils");

exports.get_accounts = async (req, res) => {
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
     WHERE tasks.status IN ('2', '11')
         
        `;
    const account = await get_database(query);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };

    account.forEach((task) => {
      task.task_date = formatDate(task.task_date);
    });
    res.json(account);
  } catch (err) {
    console.error("Error fetching Accounts Task Status", err);
    res.status(500).json({ error: "Error fetching Accounts task status" });
  }
};

exports.update_accounts_advance = async (req, res) => {
  const id = req.query.id;
  const ref_no = req.body;
  if (!id || !ref_no) {
    return res.status(400).json({ error: "task id and ref_no is required" });
  }
  try {
    const query = `
          UPDATE date_completion ,tasks
          SET date_completion.acc_ad_paid = CURRENT_TIMESTAMP,
          tasks.status = '3' ,
          tasks.ref_no =?
          WHERE task_id = ?
          `;
    await post_database(query, [ ref_no, id]);
    res.json({ message: " accounts advance Tasks added successfully" });
  } catch (err) {
    console.error("Error updating  accounts advance ");
  }
};

exports.update_accounts_pay = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
          UPDATE date_completion ,tasks
          SET date_completion.acc_app_pay = CURRENT_TIMESTAMP,
          tasks.status = '12' ,
          tasks.indicator = '5'
          WHERE task_id = ?
          `;
    await post_database(query, [id]);
    res.json({ message: " Accounts Tasks added successfully" });
  } catch (err) {
    console.error("Error updating  Accounts");
  }
};
