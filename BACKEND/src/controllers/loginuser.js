const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
//
const loginuser = async (req, res) => {
  try {
    const { useremail, password } = req.body;
    const matchuser = await User.findOne({ useremail });
    if (!matchuser) {
      return res.status(400).json({ message: "inalid email register first" });
    }
    const matchpassword = bcrypt.compare(password, User.password);
    if (!matchpassword) {
      res.status(400).json({ message: "invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({ message: "user logged in succesfully" });
  } catch (err) {
    res.status(500).json({ message: "error occured", err });
  }
};
module.exports = loginuser;
