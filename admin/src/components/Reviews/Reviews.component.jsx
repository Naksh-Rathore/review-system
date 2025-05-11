import "./Reviews.css"

import { useState } from "react"

import { ratingToImage } from "../../utils/review-methods.util.js"
import { deleteData } from "../../utils/fetch-api.util.js"

function Review({ username, rating, comment, id, setReviews }) {
    const [isDeleteBtnVisible, setIsDeleteBtnVisible] = useState(true)

    const deleteReview = async () => {
        setIsDeleteBtnVisible(false)
        await deleteData("http://localhost:8080/api/reviews", id)
        setReviews(r => r.filter(review => review._id !== id))
    }

    return (
        <div className="review">
            <div className="delete-btn-container">
                {isDeleteBtnVisible && <button title="Delete this review" onClick={deleteReview}>🗑️</button>}
            </div>

            <h3>{username}</h3>
            <h4>Rating: {ratingToImage(rating)}</h4>
            <p>{comment}</p>
        </div>
    )
}

export default Review