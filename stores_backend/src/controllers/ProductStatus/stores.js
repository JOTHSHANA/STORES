const { query } = require('express');
const {get_database, post_database} = require('../../config/db_utils')

exports.update_StoresTask = async(req, res)=>{
    const id = req.query.id;
    if(!id){
        return res.status(400).json({error:"task id is required"})
    }
    try{
        const query =`
        UPDATE products
        SET status = '4'
        WHERE id =?
        `
        const success_message = await post_database(query, [id], "Stores Updation Successfull")
        res.json({message: success_message})
    }catch(err){
        console.error("Error updating Stores status")
    }
}