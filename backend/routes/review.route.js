import express from "express"
import { getReviews,
        createReview, 
        deleteReview, 
        getAverageRating, } from "../controllers/review.controller.js"

const reviewRouter = express.Router()

reviewRouter.route("/")
.post(createReview)

reviewRouter.route("/average")
.get(getAverageRating)

reviewRouter.route("/:id")
.delete(deleteReview)

reviewRouter.route("/paginate/:page/:limit")
.get(getReviews)

export default reviewRouter