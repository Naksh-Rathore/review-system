import bcrypt from "bcrypt"
import dotenv from "dotenv"

export const checkPassword = async (req, res) => {
  const password = req.params.password

  if (!password) {
      return res.status(400).json({ message: "password not found as a route parameter" })
  }

  res.status(200).json({ passwordMatches: await bcrypt.compare(password, process.env.HASHED_ADMIN_PASSWORD) })
}