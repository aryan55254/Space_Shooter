//imports
const express = require('express');
const cors =require('cors');
const connectdb = require("./config/db");
const registerroute = require("./controllers/registeruser");
//initiaze express
const app = express();
//middlewares
app.use(express.json);
app.use(cors);
//connect to db
connectdb();
//routes
app.use("/api/register",registerroute);
//server 
app.listen(5000,console.log("server is running"));