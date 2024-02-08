const { loginUser } = require("../model/userTypes")
const { User } = require("../model/db")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
  const parsedData = loginUser.safeParse(req.body)
  if (!parsedData.success) return res.json({ message: parsedData.error })

  const userExist = await User.findOne({ email: parsedData.data.email }).exec()
  if (!userExist) return res.status(404).json({ message: "User does not exist" })

  try {
    const pwdMatch = await bcrypt.compare(parsedData.data.password, userExist.password)
    if (!pwdMatch) return res.status(401).json({ message: "Wrong password" })

    const token = jwt.sign({ userId: userExist._id }, process.env.ACCESS_JWT_SECRET, { expiresIn: "1d" })

    const refresh_token = jwt.sign({ userId: userExist._id }, process.env.REFRESH_JWT_SECRET, { expiresIn: "7d" })
    userExist.refresh_token = refresh_token;
    userExist.save()

    res.json({ token })

  } catch (err) {
    console.log(err)
    res.json({ Error: err })
  }
}

module.exports = { handleLogin }