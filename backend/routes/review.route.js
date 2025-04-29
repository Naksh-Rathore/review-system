import express from "express"

import Review from "../models/review.model.js"
import routeLogic from "../controllers/review.controller.js"


const router = express.Router()

router.route("/")
.get(routeLogic.getAllReviews)
.post(routeLogic.createReview)

router.route("/:id")
.delete(routeLogic.deleteReview)

export default router