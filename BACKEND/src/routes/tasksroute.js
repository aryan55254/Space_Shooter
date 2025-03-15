const express = require("express");
const router = express.Router();
const addtask = require("../controllers/addtask");
const deletetask = require("../controllers/deletetask");
const updatetask = require("../controllers/updatetask");
const updatestatus = require("../controllers/updatestatus");
//route to add the tasks
router.post("/addtask", addtask);
//route to delete the tasks
router.delete("/deletetask/:id", deletetask);
//route to update the tasks
router.patch("/updatetask/:id", updatetask);
//route to change the task status
router.patch("/changestatus/:id", updatestatus);
//route to get all tasks
router.get("/gettasks");
//route to get task by status
router.get("/status/:completed");
//route to get tasks by id
router.get("/:id");
//route to delete all completed tasks
router.delete("/deletecompleted");
//route to get task in sorted by date
router.get("/sort/:order");
//route to get task by search
router.get("/search/:query");
module.exports = router;
