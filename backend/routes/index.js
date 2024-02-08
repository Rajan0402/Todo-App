const express = require("express")
const router = express.Router()
const userRouter = require("./user")
const todosRouter = require('./todos')

router.use("/user", userRouter)
router.use("/todos", todosRouter)

module.exports = router