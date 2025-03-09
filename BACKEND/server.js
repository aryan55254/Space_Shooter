//imports
const express = require('express');
const cors =require('cors');
const connectdb = require("./config/db");
const registerroute = require("./routes/registeruser");
//initiaze express
const app = express();
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(express.json);
//connect to db
//connectdb();
//routes
app.use("/api/register",registerroute);
//testing 
app.get("/test", (req, res) => {
    res.send("✅ Test route is working!");
    console.log("get request here")
  });
  
//server 
app.listen(6000,console.log("server is running"));