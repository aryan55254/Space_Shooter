const express = require("express");
const cors = require("cors");
const connectdb = require("../src/config/db");
const taskroutes = require("./routes/tasksroute");
const authroutes = require("./routes/authroutes");
//initiaze express
const app = express();
//common middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//connect to db
connectdb();
//routes
//taskroutes
app.use("/api/tasks", taskroutes);
//authroutes
app.use("/api/auth", authroutes);
//server
app.listen(4000, () => console.log("server is running on the port 4000"));
