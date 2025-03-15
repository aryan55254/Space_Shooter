//db connection
const mongoose = require("mongoose");
require("dotenv").config();
//check if it exists
const connectdb = async () => {
  if (!process.env.MONGO_URI) {
    console.error("mongo uri is not present");
    process.exit(1);
  }
  //connect to mongo
  mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("mongodb is connected"))
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });
};
module.exports = connectdb;
