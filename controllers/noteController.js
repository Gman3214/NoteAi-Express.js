const Note = require("../models/noteModel");
const jwt = require("jsonwebtoken")

exports.GetNotes = async (req, res) => {
    try{
        const notes = await Note.find({noteowner: req.body.authtoken.username})
        res.status(200).json({
            status: "success",
            recevied: {
                notes: notes
            }
        })
    }catch(err){ 
        res.status(500).json({
            status: "failed",
            recevied: err
        })
    }
}

exports.CreateNote = async (req, res) => {
    try{
        const {title, text, color, index} = req.body;
        const result = await Note.create({
            noteowner: req.body.authtoken.username,
            title,
            text,
            color,
            lastmodified: Date.now()
        });

        res.status(200).json({
            status: "success",
            recevied: result
        })

    }catch(err){
        res.status(500).json({
            status: "failed",
            recevied: err
        })
    }
}

exports.PatchNote = async (req, res) => {
    try{
        const update = {}
        for (const key in req.body){
            if (key in Note.schema.paths && (key !== "_id" || key !== "__v")){
                update[key] = req.body[key];
            }
        }

        const note = await Note.find({_id: req.body._id})
        if (req.body.authtoken.username === note[0].noteowner){
            updatedNote = await Note.findByIdAndUpdate({_id: req.body._id}, update, {new: true})
            res.status(200).json({
                status: "success", 
                recevied: {
                    note: updatedNote
                }
            })
        }else
            throw "Cannot change anothers users notes"

    }catch(err){
        res.status(500).json({  
            status: "failed", 
            recevied: err
        })
    }
}

exports.DeleteNote = async (req, res) => {
    try{
        const note = await Note.find({_id: req.body._id});
        if (req.body.authtoken.username === note[0].noteowner ){
            const result = await Note.deleteOne({_id: req.body._id})
            res.status(200).json({
                status: "success",
                recevied: result
            })
        }
    }catch(err){ 
        res.status(500).json({
            status: "failed",
            recevied: err
        })
    }
}