const jwt = require("jsonwebtoken")
const { User } = require("../model/db")

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]
  if (!(authHeader.startsWith("Bearer"))) return res.status(401).json({ message: "UNAUTHORISED: Invalid Token" })
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_JWT_SECRET, async (err, decodedToken) => {
    if (err) return res.status(403).json({ message: "Forbidden: Access not allowed" })
    const userExists = await User.findById(decodedToken.userId).exec()
    if (!userExists) return res.status(403).json({ message: "Forbidden: Access not allowed" })
    req.userId = decodedToken.userId
    next()
  })
}
module.exports = authMiddleware