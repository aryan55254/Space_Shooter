const express = require("express");
const cors = require("cors");
const connectdb = require("../src/config/db");
const taskroutes = require("./routes/tasksroute");
//initiaze express
const app = express();
//common middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//connect to db
connectdb();
//routes
app.use("/tasks", taskroutes);
//server
app.listen(4000, () => console.log("server is running on the port 4000"));
