import { postReview } from "./fetch-api.util.js"

export function getAverageReview(reviews) {
    let total = 0

    reviews.forEach(review => {
        total += review.rating
    })

    return Math.round(total / reviews.length)
}

export function ratingToImage(rating) {
    let finalStr = ""

    finalStr += "★".repeat(rating)
    finalStr += "☆".repeat(5 - rating)

    return finalStr
}

export async function createReview(setAvgImage, setModalIsOpen, username, rating, comment, reviews, setReviews) {
    setModalIsOpen(false)

    if (username.length > 0 && (rating >= 1 && rating <= 5) && comment.length > 0) {
        const newReview = {
            username: username, 
            comment: comment,
            rating: rating
        }

      const updatedReviews = [newReview, ...reviews]
      setReviews(updatedReviews)  

      await postReview("http://localhost:8080/api/reviews", newReview)
      
      const numericalReview = getAverageReview(updatedReviews)
      setAvgImage(ratingToImage(numericalReview))
    }
  }