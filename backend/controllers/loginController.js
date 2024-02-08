const { loginUser } = require("../model/userTypes")
const { User } = require("../model/db")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const handleLogin = async () => {
  const parsedData = loginUser.safeParse(req.body)
  if (!parsedData.success) res.json({ message: parsedData.error })

  const userExist = await User.findOne({ username: parsedData.data.username }).exec()
  if (!userExist) res.status(404).json({ message: "User does not exist" })

  try {
    const pwdMatch = await bcrypt.compare(parsedData.data.password, userExist.password)
    if (!pwdMatch) res.status(401).json({ message: "Wrong password" })

    const token = jwt.sign({ userId: userExist._id }, process.env.ACCESS_JWT_SECRET, { expiresIn: "1d" })

    const refresh_token = jwt.sign({ userId: userExist._id }, process.env.REFRESH_JWT_SECRET, { expiresIn: "7d" })
    userExist.refresh_token = refresh_token;
    userExist.save()

    res.json({ token })

  } catch (err) {
    res.json({ Error: err })
  }
}

module.exports = { handleLogin }