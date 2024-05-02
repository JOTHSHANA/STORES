const {get_database, post_database} = require('../../config/db_utils')

exports.get_Admin = async(req, res)=>{
    try{
        const query = `
        SELECT task_id, req_person, product_details, quantity, available_qty, date, status 
        FROM products WHERE status = '0'||'1' || '2'|| '3'||'4'||'5'||'6'||'7'
        `
        const admin = await get_database(query);
        res.json(admin)
    }catch(err){
        console.error("Error fetching Admin task", err)
        res.status(500).json({error: "Error fetching Admin Task"})
    }
}

exports.update_AdminTask = async(req, res)=>{
    const id = req.query.id;
    if(!id){
        return res.status(400).json({error:"task's id is required"})
    }
    try{
        const query =`
        UPDATE products
        SET status = '1'
        WHERE id =?
        `
        const success_message = await post_database(query, [id], "Admin Updation Successfull")
        res.json({message: success_message})
    }catch(err){
        console.error("Error updating Admin status")
    }
}