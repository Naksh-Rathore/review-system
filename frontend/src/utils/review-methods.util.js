export function getAverageReview(reviews) {
    let total = 0

    reviews.forEach(review => {
        total += review.rating
    })

    return Math.round(total / reviews.length)
}

export function sortReviews() {

}