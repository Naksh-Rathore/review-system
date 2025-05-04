import express from "express"

import Review from "../models/review.model.js"
import routeLogic from "../controllers/review.controller.js"

const router = express.Router()

router.route("/")
.post(routeLogic.createReview)

router.route("/:id")
.delete(routeLogic.deleteReview)

router.route("/paginate/:page/:limit")
.get(routeLogic.getReviews)

export default router