const express = require("express");
const {userregister} = require("../controllers/register")
const userregisterrouter = express.Router();
//register user 
userregisterrouter.post("/register",userregister);
module.exports = userregisterrouter;