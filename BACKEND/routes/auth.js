//authentication routes
const express = require("express");
const userregister = require("../controllers/register");
const userlogin = require("../controllers/login");
const router = express.Router();
//register user
router.post("/register", userregister);
//loginuser
router.post("/login", userlogin);
module.exports = router;
