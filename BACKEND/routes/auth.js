//authentication routes
const express = require("express");
const { userregister } = require("../controllers/register");
const { userlogin } = require("../controllers/login");
const userregisterrouter = express.Router();
const userloginrouter = express.Router();
//register user
userregisterrouter.post("/register", userregister);
//loginuser
userloginrouter.post("/login", userlogin);
module.exports = { userregisterrouter, userloginrouter };
