const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
require("dotenv").config();
//user login
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "user doesn't exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_secret, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).send("server error");
  }
};
module.exports = loginUser;
