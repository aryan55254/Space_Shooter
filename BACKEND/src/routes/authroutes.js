const express = require("express");
const authrouter = express.Router;
const registeruser = require("../controllers/registeruser");
const loginuser = require("../controllers/loginuser");
//route to login user
authrouter.post("/login", registeruser);
//route to register user
authrouter.post("/register", loginuser);
module.exports = authrouter;
