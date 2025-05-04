import Review from "../models/review.model.js"

const getReviews = async (req, res) => {
    try {
        const page = Number(req.params.page)
        const limit = Number(req.params.limit)

        const reviews = await Review.find()
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit)

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

export default { getReviews, createReview, deleteReview }