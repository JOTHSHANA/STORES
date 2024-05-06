const { get_database, post_database } = require("../../config/db_utils");


// get stores
exports.get_stores = async(req, res)=>{
  try{
    const query = `
    SELECT  tasks.id,task_id,users.name , req_person, product_details, quantity, received_qty, task_date, tasks.status 
    FROM tasks
    INNER JOIN users
    ON tasks.req_person = users.id
     WHERE tasks.status = '2'
     AND delayed_status = '0'
    `
    const taskstatus = await get_database(query);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    taskstatus.forEach(task => {
      task.task_date = formatDate(task.task_date);
    });
    res.json(taskstatus)
}catch(err){
    console.error("Error fetching Stores Task Status", err)
    res.status(500).json({error: "Error fetching Stores task status"})
}
}

// reqPerson------stores
async function fetchAllDates() {
  const fetchDatesQuery = `
    SELECT dates
    FROM date_day
    ORDER BY dates ASC
  `;
  const datesResult = await get_database(fetchDatesQuery);
  return datesResult.map(row => row.dates.toISOString().split('T')[0]);
}

async function isDateSetInDateDay(date) {
  const formattedDate = date.toISOString().split('T')[0]; 

  const checkDateSetQuery = `
    SELECT COUNT(*)
    FROM date_day
    WHERE dates =?
  `;
  const countResult = await get_database(checkDateSetQuery, [formattedDate]);
  console.log(`Count result for date ${date}:`, countResult); // Debugging log
  return countResult[0]['COUNT(*)'] > 0;
}

async function findNextAvailableDate() {
  const dates = await fetchAllDates(); 

  let currentDate = new Date(); 
  currentDate.setHours(0, 0, 0, 0);

  while (true) {
    currentDate.setDate(currentDate.getDate() + 1);
    if (await isDateSetInDateDay(currentDate)) {
    } else {
      break;
    }
  }

  return currentDate.toISOString().split('T')[0]; 
}

exports.update_PersonTask_stores = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const nextAvailableDate = await findNextAvailableDate();
    console.log(`Next available date: ${nextAvailableDate}`);

    const updateTaskQuery = `
    UPDATE tasks
    SET status = '3',
        st_from_date = DATE_ADD(DATE(?) , INTERVAL 9 HOUR),
        st_due_date = DATE_ADD(DATE(?) + INTERVAL 9 HOUR, INTERVAL 9 HOUR),
        rp_due_date = CURRENT_TIMESTAMP,
        delayed_status = CASE WHEN CURRENT_TIMESTAMP > DATE_ADD(DATE(?) + INTERVAL 9 HOUR, INTERVAL 9 HOUR) THEN '1' ELSE delayed_status END
    WHERE id = ?
  `;
    const success_message = await post_database(
      updateTaskQuery,
      [nextAvailableDate, nextAvailableDate, id],
      "Req Person Updation Successful"
    );
    console.log(`Date set in tasks table: ${nextAvailableDate}`);
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating ReqPerson status", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
