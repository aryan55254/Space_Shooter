const express = require("express");
const cors = require("cors");
const connectdb = require("../BACKEND/config/db");
const auth = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
(async () => {
    await connectdb();
  })();
  
app.use("/api/auth", auth);
app.listen(6000,console.log("server is running"));