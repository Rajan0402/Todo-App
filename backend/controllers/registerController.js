const { addUser } = require("../model/userTypes")
const { User } = require("../model/db")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const handleNewUser = async () => {
  const parsedData = addUser.safeParse(req.body)
  if (!parsedData.success) res.json({ message: parsedData.error })

  const userExist = await User.findOne({ username: parsedData.data.username }).exec()
  if (userExist) res.status(409).json({ message: "User already exist" })

  try {
    const hashedpwd = await bcrypt.hash(parsedData.data.password, 10)

    const user = await User.create({
      username: parsedData.data.username,
      password: hashedpwd,
      email: parsedData.data.email
    })

    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_JWT_SECRET, { expiresIn: "1d" })

    res.json({ token })
  } catch (err) {
    res.json({ Error: err })
  }
}

module.exports = { handleNewUser }