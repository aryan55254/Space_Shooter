const express = require("express");
const cors = require("cors");
const connectdb = require("../BACKEND/config/db");
const auth = require("./routes/auth");
const protectedroutes = require("./routes/protectedroute");
//initize express
const app = express();
//general middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connect to db
(async () => {
  await connectdb();
})();
//routes
app.use("/api/auth", auth);
app.use("/api",protectedroutes);
app.listen(6000, console.log("server is running"));
