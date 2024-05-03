const { get_database, post_database } = require("../../config/db_utils");

exports.update_PersonTask_stores = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "task id is required" });
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

    // Format the next available date
    const nextAvailableDateString = nextAvailableDate.toISOString().split('T')[0];

    console.log("Formatted next available date:", nextAvailableDateString);

    // Update the task with the next available date
    const updateQuery = `
      UPDATE tasks
      SET status = '3',
          st_from_date = '${currentDateFormatted}',
          st_due_date = '${nextAvailableDateString}'
      WHERE id =?
    `;
    const success_message = await post_database(
      updateQuery,
      [id],
      "Req Person Updation Successful"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating ReqPerson status", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
