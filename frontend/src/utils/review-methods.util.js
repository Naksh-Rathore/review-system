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