const { object, string, boolean } = require("zod")

const addUser = object({
  username: string().regex(/^[a-zA-Z0-9_.]+$/, { message: "Username must be alphanumeric, underscore, or period." }),
  email: string().email(),
  password: string().min(6, { message: "Password must be at least 6 characters long." }),
});

const loginUser = object({
  email: string().email(),
  password: string()
})

module.exports = { addUser, loginUser }