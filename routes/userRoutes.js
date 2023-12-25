const express = require ("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.route("/register")
.post(userController.Register)

router.route("/login")
.post(userController.Login)



router.route("/")
.patch(auth.authetication, userController.PatchUser)
.delete(auth.authetication, userController.DeleteUser)

module.exports = router;