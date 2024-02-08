const { object, string, boolean } = require("zod")

const createTodoType = object({
  title: string(),
  description: string(),
  completed: boolean().default(false)
})

const updateTodoType = object({
  id: string(),
  title: string().optional(),
  description: string().optional(),
  completed: string().optional() // may want to remove this line, bc updateTodo should only update the title and description and not status as well
})

module.exports = { createTodoType, updateTodoType }