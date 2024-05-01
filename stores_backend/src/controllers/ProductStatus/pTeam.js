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
        INSERT INTO products (task_id, req_person, product_details, quantity, available_qty, date)
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

exports.update_Person_PteamTask = async(req, res)=>{
    const id = req.query.id;
    if(!id){
        return res.status(400).json({error:"task id is required"})
    }
    try{
        const query =`
        UPDATE products
        SET status = '2'
        WHERE id =?
        `
        const success_message = await post_database(query, [id], "Req PTeam-Person Updation Successfull")
        res.json({message: success_message})
    }catch(err){
        console.error("Error updating Pteam-Person status")
    }
}

exports.update_PteamTask = async(req, res)=>{
    const id = req.query.id;
    if(!id){
        return res.status(400).json({error:"task id is required"})
    }
    try{
        const query =`
        UPDATE products
        SET status = '5'
        WHERE id =?
        `
        const success_message = await post_database(query, [id], "Req PTeam Updation Successfull")
        res.json({message: success_message})
    }catch(err){
        console.error("Error updating Pteam status")
    }
}