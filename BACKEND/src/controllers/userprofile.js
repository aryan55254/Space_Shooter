const User = require("../models/User");
require("dotenv").config();
//get user profile
const getuserprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("server error");
  }
};
module.exports = getuserprofile;
