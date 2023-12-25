const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
            immutable: true
        },
        username: {
            type: String,
            require: true,
            unique: true,
            immutable: true
        },
        password:{
            type: String,
            require: true,
        },
        apikey: {
            type: String
        },
        lastsession:{
            type: Date
        },
        firstjoined:{
            type: Date
        },
        prompts: {
            type: [Object]
        }
    }
) 

const User = mongoose.model("User", userScheme);


module.exports = User;