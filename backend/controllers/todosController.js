const { Todo, User } = require('../model/db');
const { createTodoType, updateTodoType } = require("../model/todoTypes");



const getTodos = async (req, res) => {
  const todos = await Todo.find()
  console.log(todos)
  res.json({ todos })
}

const addTodo = async (req, res) => { // on adding todo add id to arr in User collection
  try {
    const addTodo = req.body;
    const parsedPayload = createTodoType.safeParse(addTodo);
    if (!parsedPayload.success) {
      return res.status(411).json({
        message: parsedPayload.error
      })
    }

    const result = await Todo.create({
      title: parsedPayload.data.title,
      description: parsedPayload.data.description
    })

    res.json({ message: "Todo created" })
  } catch (error) {
    console.log(error)
  }
}

const updateTodo = async (req, res) => {
  try {
    const parsedPayload = updateTodoType.safeParse(req.body)
    if (!parsedPayload.success) {
      return res.status(411).json({
        message: parsedPayload.error
      })
    }
    const { id, ...restInput } = parsedPayload.data
    await Todo.findOneAndUpdate({ _id: id },)

  } catch (err) {
    res.json({ message: err.message })
  }
}

const updateTodoStatus = async (req, res) => {
  try {
    const updateTodoId = req.body.todoId;

    const updatedTodo = await Todo.findOneAndUpdate({
      _id: updateTodoId
    }, {
      completed: true
    })

    if (updatedTodo === null) res.json({ message: "Todo does not exist!" })

    return res.json({ message: "Todo updated!" })
  } catch (err) {
    res.json({ message: err.message })
  }
}

const deleteTodo = async (req, res) => { // on del todo, del id from arr in User collection
  try {
    const todoToDelete = req.body.id
    const removedTodo = await Todo.findOneAndDelete({ _id: todoToDelete })

    if (removedTodo === null) return res.json({ message: "Todo deos not exist!" })

    return res.json({ message: "Todo removed!" })
  } catch (err) {
    return res.json({ message: err.message })
  }
}

module.exports = {
  addTodo,
  getTodos,
  updateTodo,
  updateTodoStatus,
  deleteTodo
}