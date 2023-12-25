const mongoose = require("mongoose");

const noteScheme = new mongoose.Schema(
    {
        noteowner: {
            type: String,
            immutable: true,
        },
        title: {
            type: String,
        },
        text:{
            type: String,
            require: true,
        },
        color: {
            type: String
        },
        lastmodified:{
            type: Date
        }
    }
) 

const Note = mongoose.model("Note", noteScheme);

module.exports = Note;