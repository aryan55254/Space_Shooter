//protected route
const express = require("express");
const protectroute = require("../middlewares/authmiddleware");
const router = express.Router();
router.get("/profile", protectroute, (req, res) => {
  res.json({
    message: "protected route accesed",
    userid: req.user, //id extracted from the decoded jwt
  });
});
module.exports = router;
