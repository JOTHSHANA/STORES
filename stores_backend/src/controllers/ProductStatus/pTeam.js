const { get_database, post_database } = require("../../config/db_utils");

exports.post_pTeam = async (req, res) => {
  const {
    task_id,
    req_person,
    product_details,
    quantity,
    available_qty,
    date,
  } = req.body;
  if (
    !task_id ||
    !req_person ||
    !product_details ||
    !quantity ||
    !date
  ) {
    return res.status(400).json({
      errro: "fields are required!",
    });
  }

  try {
    const query = `
        INSERT INTO tasks (task_id, req_person, product_details, quantity, available_qty, date)
        VALUES(?, ?, ?, ?, ?, ?)
        `;

    const success_message = await post_database(
      query,
      [task_id, req_person, product_details, quantity, available_qty, date],
      "Products added Successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error Adding Products");
  }
};

exports.update_Person_PteamTask = async(req, res) => {
  const id = req.query.id;
  if (!id) {
      return res.status(400).json({ error: "task id is required" });
  }
  try {
      // Get current date
      const currentDate = new Date();
      // Convert to ISO string format (YYYY-MM-DD)
      const currentDateFormatted = currentDate.toISOString().split('T')[0];

      // Get available dates query
      const availableDatesQuery = `
          SELECT DATE(CONVERT_TZ(dates, '+00:00', '+00:00')) AS dates
          FROM date_day
          WHERE dates > '${currentDateFormatted}'
          ORDER BY dates;
      `;
      // Execute the query to get available dates
      const availableDates = await get_database(availableDatesQuery);

      // Find the next consecutive date after the current date
      let nextDate = null;
      for (let i = 0; i < availableDates.length - 1; i++) {
          const date = new Date(availableDates[i].dates);
          const nextAvailableDate = new Date(availableDates[i + 1].dates);
          const differenceInTime = nextAvailableDate.getTime() - date.getTime();
          const differenceInDays = differenceInTime / (1000 * 3600 * 24);

          // If the next date is consecutive
          if (differenceInDays === 1) {
              nextDate = nextAvailableDate;
              break;
          }
      }

      // If next date is found, update the task
      if (nextDate) {
          // Update task query
          const updateQuery = `
              UPDATE tasks
              SET status = '2',
                  rp_from_date = '${currentDateFormatted}',
                  rp_due_date = '${nextDate.toISOString().split('T')[0]}'
              WHERE id = ?
          `;
          const success_message = await post_database(updateQuery, [id], "Req PTeam-Person Updation Successful");
          return res.json({ message: success_message });
      } else {
          return res.status(400).json({ error: "No consecutive dates available after the current date" });
      }
  } catch (err) {
      console.error("Error updating Pteam-Person status:", err);
      return res.status(500).json({ error: "Internal server error" });
  }
};


exports.update_Acc_PteamTask = async(req, res)=>{
    const id = req.query.id;
    if(!id){
        return res.status(400).json({error:"task id is required"})
    }
    try{
        const query =`
        UPDATE tasks
        SET status = '5'
        WHERE id =?
        `
        const success_message = await post_database(query, [id], "Req PTeam Updation Successfull")
        res.json({message: success_message})
    }catch(err){
        console.error("Error updating Pteam status")
    }
}

exports.update_Pteam_StoresTask = async(req, res)=>{
  const id = req.query.id;
  if(!id){
      return res.status(400).json({error:"task id is required"})
  }
  try {
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    const currentDateFormatted = currentDate.toISOString().split('T')[0];
    console.log(currentDateFormatted)
    const dateListQuery = `
      SELECT DATE(CONVERT_TZ(dates,'+00:00','+00:00')) AS dates
      FROM date_day
      WHERE dates > '${currentDateFormatted}'
      ORDER BY dates;
    `;
    const dateList = await get_database(dateListQuery);
    
    console.log("Retrieved dates from the database:", dateList);

    const datesArray = dateList.map(row => {
      const dateWithoutTimezone = new Date(row.dates);
      dateWithoutTimezone.setUTCHours(0, 0, 0, 0);
      return dateWithoutTimezone;
    });

    console.log("Dates array:", datesArray);

    let nextAvailableDate;
    for (let i = 0; i <= datesArray.length ; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      const nextDateWithoutTimezone = new Date(Date.UTC(nextDate.getUTCFullYear(), nextDate.getUTCMonth(), nextDate.getUTCDate()));
      if (!datesArray.find(date => date.getTime() === nextDateWithoutTimezone.getTime())) {
        nextAvailableDate = nextDate;
        break;
      }
    }

    console.log("Next available date:", nextAvailableDate);

    if (!nextAvailableDate) {
      return res.status(500).json({ error: "No available date found" });
    }
    nextAvailableDate.setDate(nextAvailableDate.getDate() + 1);

    const nextAvailableDateString = nextAvailableDate.toISOString().split('T')[0];

    console.log("Formatted next available date:", nextAvailableDateString);

    const updateQuery = `
      UPDATE tasks
      SET status = '4',
          pteam_from_date = '${currentDateFormatted}',
          pteam_due_date = '${nextAvailableDateString}'
      WHERE id =?
    `;
    const success_message = await post_database(
      updateQuery,
      [id],
      "PTeam Updation Successful"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating PTeam status", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}