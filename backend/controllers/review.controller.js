import Review from "../models/review.model.js"

// To get all products (no ID because it's not needed yet)
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
        res.status(200).json(reviews)
    } 
    
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body)
        res.status(200).json(review)
    } 
    
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// For admin only because reviews are anonymous (yet)
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id)
        if (!review) {
            return res.status(404).json({ message: "Review not found" })
        }
        res.status(200).json(review)
    } 
    
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default { getAllReviews, createReview, deleteReview }