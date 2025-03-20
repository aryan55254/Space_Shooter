const jwt = require("jsonwebtoken");
const authmiddleware = async (req, res) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "no token access denied" });
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: "invalid token" });
  }
};
module.exports = authmiddleware;
