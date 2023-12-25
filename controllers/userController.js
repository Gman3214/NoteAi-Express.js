const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.Login = async (req, res) => {
    try{
        
        
    }catch(err){
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}

exports.Register = async (req, res) => {
    try{
        // Create salts, hash password and apikey 
        const newUser = { ...req.body }
        let salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password, salt)
        if (newUser.apikey){
            salt = await bcrypt.genSalt(10)
            newUser.apikey = await bcrypt.hash(newUser.apikey, salt)
        }

        await User.create({
            email: newUser.email,
            username: newUser.username,
            password:newUser.password,
            apikey: newUser.apikey,
            lastsession: Date.now(),
            firstjoined: Date.now(),
            prompts: "add default ones later"
        })

        res.status(200).json({ 
            status: "success",
            recevied: newUser
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}

exports.PatchUser = async (req, res) => {
    try{
        

    }catch(err){
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}

exports.DeleteUser = async (req, res) => {
    try{
        

    }catch(err){
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}