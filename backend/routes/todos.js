const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const todosController = require("../controllers/todosController")

router.route("/getTodos")
  .get(authMiddleware, todosController.getTodos)
router.route("/addTodo")
  .post(authMiddleware, todosController.addTodo)
router.route("/udpateTodo")
  .put(authMiddleware, todosController.updateTodo)
router.route("/udpateStatus")
  .put(authMiddleware, todosController.updateTodoStatus)
router.route("/removeTodo")
  .delete(authMiddleware, todosController.deleteTodo)

// router.post("/addTodo", authMiddleware, todosController.addTodo)

// router.put("/udpateTodo", authMiddleware, todosController.updateTodo)

// router.put("/udpateStatus", authMiddleware, todosController.updateTodoStatus)

// router.delete("/removeTodo", authMiddleware, todosController.deleteTodo)

module.exports = router
