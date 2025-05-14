import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"

import reviewRouter from "./routes/review.route.js"
import authRouter from "./routes/auth.route.js"

import { logRequestInfo } from "./middleware/logRequestInfo.middleware.js"
import { limiter } from "./middleware/rateLimiter.middleware.js"

dotenv.config()

const app = express()

const port = process.env.PORT || 8080
const mongodb_uri = process.env.MONGODB_URI

app.use(limiter)
app.use(logRequestInfo)

app.use(cors())
app.use(express.json())

app.use("/api/reviews", reviewRouter)
app.use("/api/auth", authRouter)

app.all("/*splat", (req, res) => {
res.status(404).json({message: "Page not found"})
})

mongoose.connect(mongodb_uri)
.then(() => {
console.log("Connected to MongoDB successfully")
app.listen(port, () => console.log(`Server listening on port ${port}...\n`))
})
.catch(error => console.log(`Could not connect to MongoDB: ${error}`))