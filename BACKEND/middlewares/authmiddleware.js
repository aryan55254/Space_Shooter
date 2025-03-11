//middleware to protect routes by veryfying jwt token
const jwt = require("jsonwebtoken");
require("dotenv").config();
const protectroute = (req, res, next) => {
  //extract token from auth header
  const token = req.headers.authorization?.split("")[1];
  if (!token) {
    return;
    //error if no token
    res.status(401).json({ message: "unauthorised" });
  }
  try {
    //verify the token with secret key
    const decoded = jwt.verify(token, process.env.jwt_secret);
    //attach udecoded user id to req object for more use
    req.user = decoded.userid;
    //move to next middlewares
    next();
  } catch (error) {
    res.status(401).json({ message: "invalid token" });
  }
};
module.exports = { protectroute };
