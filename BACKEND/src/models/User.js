//user model
const { default: mongoose } = require("mongoose");
const Userschema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    trim: true,
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.Schema("user", Userschema);
