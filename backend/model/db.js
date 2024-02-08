const mongoose = require('mongoose')

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log('connected to DB')
    })
    .catch(error => {
      console.log('Error:', error)
    })
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const Todo = mongoose.model("Todo", todoSchema)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9_.]+$/, // Validate alphanumeric, underscore, and periods
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  todoList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Todo
  }],
  refreshToken: String,
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = {
  User,
  Todo,
  connectDB
}