import Review from "../models/review.model.js"

const getReviews = async (req, res) => {
    try {
        const page = Math.max(1, Number(req.params.page) || 1)
        const limit = Math.max(1, Number(req.params.limit) || 10)

        const totalReviews = await Review.countDocuments()

        const reviews = await Review.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit) 
        .limit(limit)

        res.status(200).json({
            data: reviews,
            totalReviews: totalReviews
        })
    } 
    
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAverageRating = async (req, res) => {
  try {
    const result = await Review.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 }
        }
      }
    ])

    if (!result.length) {
      return res.json({ averageRating: 0, totalReviews: 0 })
    }

    res.json({
      averageRating: Math.round(result[0].averageRating),
      totalReviews: result[0].totalReviews
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate average rating" })
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

export default { getReviews, createReview, deleteReview, getAverageRating }