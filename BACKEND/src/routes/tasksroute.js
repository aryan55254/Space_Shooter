const express = require("express");
const tasksrouter = express.Router();
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
const authmiddleware = require("../middlewares/authmiddleware");

//route to get tasks by id
tasksrouter.get("/gettask/:id", authmiddleware, gettaskbyid);
//route to add the tasks
tasksrouter.post("/addtask", authmiddleware, addtask);
//route to delete the tasks
tasksrouter.delete("/deletetask/:id", authmiddleware, deletetask);
//route to update the tasks
tasksrouter.patch("/updatetask/:id", authmiddleware, updatetask);
//route to change the task status
tasksrouter.patch("/changestatus/:id/:status", authmiddleware, updatestatus);
//route to get all tasks
tasksrouter.get("/gettasks", authmiddleware, gettasks);
//route to get task by status
tasksrouter.get("/status/:status", authmiddleware, gettaskbystatus);
//route to delete all completed tasks
tasksrouter.delete(
  "/deletebystatus/:status",
  authmiddleware,
  deletetaskbystatus
);
//route to get task in sorted by date
tasksrouter.get("/sort/:order", authmiddleware, sorttask);
//route to get task by search
tasksrouter.get("/search/:query", authmiddleware, searchtasks);
//route to get full task description
tasksrouter.get("/full/:id", authmiddleware, taskdescription);
module.exports = tasksrouter;
