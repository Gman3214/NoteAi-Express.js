const Note = require("../models/noteModel");
const jwt = require("jsonwebtoken")

exports.GetNotes = async (req, res) => {
    try{
        token = jwt.verify(req.body.authtoken, process.env.CRYPTO_SECRET)
        

    }catch(err){
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}

exports.CreateNote = async (req, res) => {
    try{
        

    }catch(err){
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}

exports.PatchNote = async (req, res) => {
    try{
        

    }catch(err){
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}

exports.DeleteNote = async (req, res) => {
    try{
        

    }catch(err){
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}