const { get_database, post_database } = require("../../config/db_utils");

exports.get_dates = async (req, res) => {
  try {
    const query = `
        SELECT id, dates FROM date_day 
        `;
    const dates = await get_database(query);
    res.json(dates);
  } catch (err) {
    console.error("Error fetching dates", err);
    res.status(500).json({ error: "Error fetching dates" });
  }
};

exports.post_dates = async (req, res) => {
  try {
    const query = `
        INSERT INTO date_day(dates)VALUE(?)
        `;
    const success_message = await post_database(
      query,
      "Dates added successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error Adding Dates");
  }
};
