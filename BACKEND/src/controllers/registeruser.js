const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
require("dotenv").config();
//user register
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      errors: errors.array(),
    });
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        message: "email already in use",
      });
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    user = new User({
      name,
      email,
      password: hashedpassword,
    });
    await user.save();
    const token = jwt.sign({ id: user.id }, process.env.JWT_secret, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).send("server error");
  }
};
module.exports = registerUser;
