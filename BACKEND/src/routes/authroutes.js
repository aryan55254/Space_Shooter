const express = require("express");
const authrouter = express.Router();
const registeruser = require("../controllers/registeruser");
const loginuser = require("../controllers/loginuser");
const getuser = require("../controllers/userprofile");
const authmiddleware = require("../middlewares/authmiddleware");
//route to register user
authrouter.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  registeruser
);
//route to login user
authrouter.post(
  "/login",
  [
    check("email", "valid email is required").isEmail(),
    check("password", "password is required").exists(),
  ],
  loginuser
);
//route to get user profile
authrouter.get("/profile", authmiddleware, getuser);
module.exports = authrouter;
