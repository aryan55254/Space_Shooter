const USER = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userregister = async(req,res)=>{
    try {
        const {username , useremail , password} = req.body;
        //check if user is there
        let user = await USER.findOne({useremail});
        if(user) return res.status(400).json({msg:"user already exists"});
        //hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        //save user
        user = new USER({username , useremail , password: hashedpassword});
        await user.save();
        res.status(201).json({ msg: "User registered successfully" });
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
    };
module.exports = {userregister};