import "./Reviews.css"

import { ratingToImage } from "../../utils/review-methods.util.js"
import { deleteData } from "../../utils/fetch-api.util.js"

function Review({ username, rating, comment, id, setReviews }) {
    const deleteReview = async () => {
        setReviews(r => r.filter(review => review._id !== id))

        await deleteData("http://localhost:8080/api/reviews", id)
    }

    return (
        <div className="review">
            <div className="delete-btn-container">
                <button title="Delete this review" onClick={deleteReview}>🗑️</button>
            </div>

            <h3>{username}</h3>
            <h4>Rating: {ratingToImage(rating)}</h4>
            <p>{comment}</p>
        </div>
    )
}

export default Review