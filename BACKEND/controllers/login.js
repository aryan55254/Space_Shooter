//login logic
const bcrypt = require("bcryptjs");
const generatetoken = require("../utility/jwt");
const USER = require("../models/user");
const jwt = require("jsonwebtoken");

const loginsuer = async (req, res) => {
  try {
    //extract user email and password from req body
    const { useremail, userpassword } = req.body;
    //check if they exists
    let user = await USER.findOne({ useremail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //compare
    const ispasswordvalid = await bcrypt.compare(userpassword, user.password);
    if (!ispasswordvalid) {
      return res.status(404).json({ message: "password doesn't match" });
    }
    //generate jwt token
    const token = generatetoken(user._id);
    //send success response with token and user id
    res.status(200).json({ token, userid: user._id });
  } catch (error) {
    //jandle errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { loginsuer };
