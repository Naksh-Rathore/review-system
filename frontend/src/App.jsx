import CompanyInfo from "./components/Company-Info/Company-Info.component.jsx"
import { getAverageReview, ratingToImage } from "./utils/review-methods.util.js"
import { getReviews, postReview } from "./utils/fetch-api.util.js"
import { useEffect, useState } from "react"
import Review from "./components/Reviews/Reviews.component.jsx"
import Modal from "react-modal"

Modal.setAppElement('#root')

function App() {
  const [avgImage, setAvgImage] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [reviews, setReviews] = useState([])
  
  const [username, setUsername] = useState("")
  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState("")
    
  useEffect(() => {
    const fetchAndLog = async () => {
    const res = await getReviews("http://localhost:8080/api/reviews")
    const numericalReview = getAverageReview(res)

    setAvgImage(ratingToImage(numericalReview))
      setReviews(res)
    }
    
      fetchAndLog()
  }, [reviews.length])

  const createReview = async () => {
    setModalIsOpen(false)

    if (username.length > 0 && (rating >= 1 && rating <= 5) && comment.length > 0) {
      const newReview = {
            username: username, 
            comment: comment,
            rating: Number(rating)
        }

      setReviews(r => [newReview, ...r])
      await postReview("http://localhost:8080/api/reviews", newReview)
    }
  }  

  return (
    <div className="container">
      <CompanyInfo avgImage={avgImage}/>
      <button id="write-review-button" onClick={() => setModalIsOpen(true)}>Write a Review</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px'
          }
        }}
      >
        <input onChange={event => setUsername(event.target.value.trim())} type="text" placeholder="Enter Username"/>
        <input onChange={event => setRating(event.target.value)} type="number" placeholder="Enter Rating"/>
        <textarea onChange={event => setComment(event.target.value)} placeholder="Enter Comment"/><br /><br />
        
        <button onClick={createReview}>Submit</button>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>

      {reviews.map((review, index) => (
            <Review
              key={index}
              username={review.username}
              rating={review.rating}
              comment={review.comment}
            />
        ))}
    </div>
  )
}

export default App
