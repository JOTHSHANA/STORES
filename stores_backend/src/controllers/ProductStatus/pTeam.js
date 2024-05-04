const { get_database, post_database } = require("../../config/db_utils");

// get
exports.get_pteam = async (req, res) => {
  try {
    const query = `
    SELECT  tasks.id,task_id,users.name , req_person, product_details, quantity, received_qty, task_date, tasks.status
    FROM tasks
    INNER JOIN users
    ON tasks.req_person = users.id
     WHERE tasks.status = '4'
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
exports.post_pTeam = async (req, res) => {
  const {
    task_id,
    req_person,
    product_details,
    quantity,
    available_qty,
  } = req.body;
  if (!task_id || !req_person || !product_details || !quantity ) {
    return res.status(400).json({
      errro: "fields are required!",
    });
  }

  try {
    const currentDate = new Date();
    const currentDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const query = `
        INSERT INTO tasks (task_id, req_person, product_details, quantity, available_qty, task_date)
        VALUES(?, ?, ?, ?, ?, ?)
        `;

    const success_message = await post_database(
      query,
      [task_id, req_person, product_details, quantity, available_qty, currentDateTime],
      "Products added Successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error Adding Products");
  }
};

// pteam ---- req person
async function findNextAvailableDates() {
  const dates = await fetchAllDates();
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  let nextAvailableDates = [];
  let foundDates = 0;

  while (foundDates < 2) {
    currentDate.setDate(currentDate.getDate() + 1);
    if (!(await isDateSetInDateDay(currentDate))) {
      nextAvailableDates.push(currentDate.toISOString().split("T")[0]);
      foundDates++;
    }
  }

  return nextAvailableDates;
}

exports.update_Person_PteamTask = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    // Find the next two available dates
    const nextAvailableDates = await findNextAvailableDates();
    console.log(`Next available dates: ${nextAvailableDates}`);

    // Assuming the first date is rp_from_date and the second date is rp_due_date
    const rp_from_date = nextAvailableDates[0];
    const rp_due_date = nextAvailableDates[1];

    // Correctly set the rp_from_date and rp_due_date
    const updateTaskQuery = `
      UPDATE tasks
      SET status = '3',
          rp_from_date = DATE_ADD(DATE(?), INTERVAL 9 HOUR),
          rp_due_date = DATE_ADD(DATE(?) + INTERVAL 9 HOUR, INTERVAL 9 HOUR)
      WHERE id =?
    `;
    // Declare success_message only once
    const success_message = await post_database(
      updateTaskQuery,
      [rp_from_date, rp_due_date, id],
      "ReqPerson Updation Successful"
    );
    console.log(`Date set in tasks table: ${rp_from_date} and ${rp_due_date}`);
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating ReqPerson status", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// pteam ---- acc
exports.update_Acc_PteamTask = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
  }
  try {
    const query = `
        UPDATE tasks
        SET status = '5'
        WHERE id =?
        `;
    const success_message = await post_database(
      query,
      [id],
      "Req PTeam Updation Successfull"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating Pteam status");
  }
};

// stores ---- pteam
async function fetchAllDates() {
  const fetchDatesQuery = `
    SELECT dates
    FROM date_day
    ORDER BY dates ASC
  `;
  const datesResult = await get_database(fetchDatesQuery);
  return datesResult.map((row) => row.dates.toISOString().split("T")[0]);
}

async function isDateSetInDateDay(date) {
  const formattedDate = date.toISOString().split("T")[0];

  const checkDateSetQuery = `
    SELECT COUNT(*)
    FROM date_day
    WHERE dates =?
  `;
  const countResult = await get_database(checkDateSetQuery, [formattedDate]);
  console.log(`Count result for date ${date}:`, countResult);
  return countResult[0]["COUNT(*)"] > 0;
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

  return currentDate.toISOString().split("T")[0];
}
exports.update_Pteam_StoresTask = async (req, res) => {
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
          pteam_from_date = DATE_ADD(DATE(?) , INTERVAL 9 HOUR),
          pteam_due_date = DATE_ADD(DATE(?) + INTERVAL 9 HOUR, INTERVAL 9 HOUR)
      WHERE id =?
    `;
    const success_message = await post_database(
      updateTaskQuery,
      [nextAvailableDate, nextAvailableDate, id],
      "Stores Updation Successful"
    );
    console.log(`Date set in tasks table: ${nextAvailableDate}`);
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating Stores status", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};