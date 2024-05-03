const {get_database, post_database} = require('../../config/db_utils')

exports.get_Mteam = async(req, res)=>{
    try{
        const query = `
        SELECT  tasks.id,task_id,users.name , req_person, product_details, quantity, received_qty, task_date, tasks.status 
    FROM tasks
    INNER JOIN users
    ON tasks.req_person = users.id
     WHERE tasks.status = '0'
    `;
        const mteam = await get_database(query);
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
          };
      
          mteam.forEach(task => {
            task.task_date = formatDate(task.task_date);
          });
        res.json(mteam)
    }catch(err){
        console.error("Error fetching Task Status", err)
        res.status(500).json({error: "Error fetching task status"})
    }
}

exports.update_MteamTask = async(req, res)=>{
    const id = req.query.id;
    if(!id){
        return res.status(400).json({error:"task id is required"})
    }
    try{
        const query =`
        UPDATE tasks
        SET status = '1'
        WHERE id =?
        `
        const success_message = await post_database(query, [id], "Mteam Updation Successfull")
        res.json({message: success_message})
    }catch(err){
        console.error("Error updating Mteam status")
    }
}