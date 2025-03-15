//update task status 
const tasks = require("../models/tasks");
const updatetaskstatus = async(req , res) => {
    try {
    const {id} = req.params;
    const {status} = req.body;
    if (typeof status !== "boolean"){
     return   res.status(400).json({message : "give a boolean value"})
    }
    const task = await tasks.findByIdAndUpdate(id,{completed : status},{new:true});
    return res.status(200).json({message : "task sttaus updated"});
    }
    catch(error){
     res.status(500).json({message : "task status update failed ", error});
    }
 }
 module.exports = updatetaskstatus;