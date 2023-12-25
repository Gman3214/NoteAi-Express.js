const express = require ("express");
const router = express.Router();
const userController = require("../controllers/userController")

router.route("/register")
.post(userController.Register)

router.route("/login")
.post(userController.Login)

router.route("/")
.patch(userController.PatchUser)
.delete(userController.DeleteUser)

module.exports = router;