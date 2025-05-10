import "./Reviews.css"
import { ratingToImage } from "../../utils/review-methods.util.js"

function Review({ username, rating, comment }) {
    return (
        <div className="review">
            <div className="delete-btn-container">
                <button>🗑️</button>
            </div>

            <h3>{username}</h3>
            <h4>Rating: {ratingToImage(rating)}</h4>
            <p>{comment}</p>
        </div>
    )
}

export default Review