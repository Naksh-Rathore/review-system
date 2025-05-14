import express from "express"
import { checkPassword } from "../controllers/auth.controller.js"

const authRouter = express.Router() 

authRouter.route("/check-password/:password")
.get(checkPassword)

export default authRouter