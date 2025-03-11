const jwt = require("jsonwebtoken");
require("dotenv").config;
const generatetoken = (userid) => {
  return jwt.sign({ userid }, process.env.jwt_secret, { expiresIn: "15m" });
};
export default generateToken;
