//user details 
const mongoose = require("mongoose");
//schema
const userschema = new mongoose.Schema (
    {
        username : {
            type : String , required : true
        },
        useremail : {
            type : String , required : true 
        },
        password : {
            type:String , required :true
        },
        datecreated : {
            type : Date , default : Date.now
        }

    }
);
const USER = mongoose.model("URL", userschema);
module.exports = USER;