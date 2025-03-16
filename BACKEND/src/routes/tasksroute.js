const express = require("express");
const router = express.Router();
const addtask = require("../controllers/addtask");
const deletetask = require("../controllers/deletetask");
const updatetask = require("../controllers/updatetask");
const updatestatus = require("../controllers/updatestatus");
const gettasks = require("../controllers/getalltasks");
const gettaskbystatus = require("../controllers/taskbystatus");
const gettaskbyid = require("../controllers/taskbyid");
const deletetaskbystatus = require("../controllers/deletebystatus");
const sorttask = require("../controllers/getsortedtasks");
const searchtasks = require("../controllers/seachtask");
const taskdescription = require("../controllers/getfulltask");
//route to add the tasks
router.post("/addtask", addtask);
//route to delete the tasks
router.delete("/deletetask/:id", deletetask);
//route to update the tasks
router.patch("/updatetask/:id", updatetask);
//route to change the task status
router.patch("/changestatus/:id", updatestatus);
//route to get all tasks
router.get("/gettasks", gettasks);
//route to get task by status
router.get("/status/:completed", gettaskbystatus);
//route to get tasks by id
router.get("/:id", gettaskbyid);
//route to delete all completed tasks
router.delete("/deletecompleted", deletetaskbystatus);
//route to get task in sorted by date
router.get("/sort/:order", sorttask);
//route to get task by search
router.get("/search/:query", searchtasks);
//route to get full task description
router.get("/full/:id", taskdescription);
module.exports = router;
