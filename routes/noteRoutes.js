const express = require ("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const auth = require("../middleware/Auth");


router.route("/")
.get(auth.authetication, noteController.GetNotes)
.post(auth.authetication, noteController.CreateNote)
.patch(auth.authetication, noteController.PatchNote)
.delete(auth.authetication, noteController.DeleteNote);

module.exports = router;