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

//route to get tasks by id
tasksrouter.get("/gettask/:id", authmiddleware, gettaskbyid);
//route to add the tasks
tasksrouter.post(
  "/addtask",
  addtask
);
//route to delete the tasks
tasksrouter.delete("/deletetask/:id", deletetask);
//route to update the tasks
tasksrouter.patch(
  "/updatetask/:id",
  updatetask
);
//route to change the task status
tasksrouter.patch(
  "/changestatus/:id/:status",
  updatestatus
);
//route to get all tasks
tasksrouter.get("/gettasks", gettasks);
//route to get task by status
tasksrouter.get("/status/:status",  gettaskbystatus);
//route to delete all completed tasks
tasksrouter.delete(
  "/deletebystatus/:status",
  deletetaskbystatus
);
//route to get task in sorted by date
tasksrouter.get("/sort/:order", sorttask);
//route to get task by search
tasksrouter.get("/search/:query", searchtasks);
//route to get full task description
tasksrouter.get("/full/:id", taskdescription);
module.exports = tasksrouter;
