const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")


router.use("/Register",authController.registerUser)
router.use("/Login",authController.loginUser)


module.exports = router