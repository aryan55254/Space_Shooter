//mongo connection
require("dotenv").config();
const mongoose = require("mongoose");
//check uri
const connectdb = async () => {
  if (!process.env.MONGO_URI) {
    console.error("mongo_uri is missing");
    process.exit(1);
  }
  //connect here
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("mongo is connected");
    })
    .catch((err) => console.log(err));
};
module.exports = connectdb;
