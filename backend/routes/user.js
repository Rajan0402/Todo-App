const express = require("express")
const router = express.Router()
const { handleNewUser } = require("../controllers/registerController")
const { handleLogin } = require("../controllers/loginController")

router.post("/signup", handleNewUser)
router.get("/signin", handleLogin)

module.exports = router