import CompanyInfo from "./components/Company-Info/Company-Info.component.jsx"
import Review from "./components/Reviews/Reviews.component.jsx"
import Paginate from "./components/Paginate/Paginate.component.jsx"

import { getAverageReview, ratingToImage } from "./utils/review-methods.util.js"
import { getReviews, postReview } from "./utils/fetch-api.util.js"

import { useEffect, useState, useRef } from "react"
import Modal from "react-modal"

Modal.setAppElement('#root')

function App() {
  const [avgImage, setAvgImage] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [reviews, setReviews] = useState([])
  
  const [username, setUsername] = useState("")
  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState("")

  const [page, setPage] = useState(1)
  const totalReviews = useRef(0)
    
  useEffect(() => {
      const fetchAndLog = async () => {
      const res = await getReviews(`http://localhost:8080/api/reviews/paginate/${page}/3`)

      if (res) {
        const numericalReview = getAverageReview(res.data)

        setAvgImage(ratingToImage(numericalReview))
        setReviews(res.data)
        totalReviews.current = res.totalReviews
      }
    }
    
      fetchAndLog()
  }, [page])

  const createReview = async () => {
    setModalIsOpen(false)

    if (username.length > 0 && (rating >= 1 && rating <= 5) && comment.length > 0) {
      const newReview = {
            username: username, 
            comment: comment,
            rating: Number(rating)
        }

      const updatedReviews = [newReview, ...reviews]
      setReviews(updatedReviews)  

      await postReview("http://localhost:8080/api/reviews", newReview)
      
      const numericalReview = getAverageReview(updatedReviews)
      setAvgImage(ratingToImage(numericalReview))
    }
  }  

  return (
    <div className="container">
      <CompanyInfo avgImage={avgImage} />
      <button id="write-review-button" onClick={() => setModalIsOpen(true)}>Write a Review</button>

      <Modal
        id="modal"
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
        <h1>Write a Review</h1>

        <input value={username} onChange={event => setUsername(event.target.value.trim())} type="text" placeholder="Enter Username"/><br /><br />
        <input value={rating} onChange={event => setRating(event.target.value)} type="number" placeholder="Enter Rating"/><br /><br />

        <textarea value={comment} onChange={event => setComment(event.target.value)} placeholder="Enter Comment"/><br /><br />
        
        <button onClick={createReview} id="submit-btn-modal">Submit</button>
        <button onClick={() => setModalIsOpen(false)} id="close-btn-modal">Close</button>
      </Modal>

    {reviews.map((review, index) => (
      <Review
        key={index}
        username={review.username}
        rating={review.rating}
        comment={review.comment}
      />
    ))}

    <Paginate totalReviews={totalReviews.current}
              setPage={setPage}
              page={page}/>
    </div>
  )
}

export default App