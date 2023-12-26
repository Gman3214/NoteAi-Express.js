const Note = require("../models/noteModel");
const jwt = require("jsonwebtoken")

exports.GetNotes = async (req, res) => {
    try{
        console.log("entered");
        //const notes = await Note.find({noteowner: req.body.authtoken.username})
        res.status(200).json({
            status: "success",
            results: {
                //notes: notes
            }
        })
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