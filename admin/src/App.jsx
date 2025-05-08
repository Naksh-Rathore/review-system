import CompanyInfo from "./components/Company-Info/Company-Info.component.jsx"
import Review from "./components/Reviews/Reviews.component.jsx"
import Paginate from "./components/Paginate/Paginate.component.jsx"
import StarClicker from "./components/Star-Clicker/Star-Clicker.component.jsx"

import { getAverageReview, ratingToImage, createReview } from "./utils/review-methods.util.js"
import { getReviews } from "./utils/fetch-api.util.js"

import { useEffect, useState, useRef } from "react"
import Modal from "react-modal"

import "./Modal.css"

Modal.setAppElement('#root')

function App() {
  const [avgImage, setAvgImage] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [reviews, setReviews] = useState([])
  
  const [username, setUsername] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  const [page, setPage] = useState(1)
  const totalReviews = useRef(0)

  const reviewLimit = 10
    
  useEffect(() => {
      const fetchAndLog = async () => {
      const res = await getReviews(`http://localhost:8080/api/reviews/paginate/${page}/${reviewLimit}`)

      if (res) {
        const numericalReview = getAverageReview(res.data)

        setAvgImage(ratingToImage(numericalReview))
        setReviews(res.data)
        totalReviews.current = res.totalReviews
      }
    }
    
      fetchAndLog()
  }, [page])  

  return (
    <div className="container">
      <CompanyInfo avgImage={avgImage} />

      <div className="button-container">
        <button id="write-review-button" onClick={() => setModalIsOpen(true)}>Write a Review</button>
      </div>

      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
      >
        <h1>Write a Review</h1>

        <input value={username} maxLength={20} onChange={event => setUsername(event.target.value.trim())} type="text" placeholder="Enter Username"/><br />
        <StarClicker setRating={setRating}/><br />

        <textarea value={comment} maxLength={238} onChange={event => setComment(event.target.value)} placeholder="Enter Comment"/><br /><br />
        
        <button onClick={() => createReview(setAvgImage, setModalIsOpen, username, rating, comment, reviews, setReviews)} id="submit-btn-modal">Submit</button>
        <button onClick={() => setModalIsOpen(false)} id="close-btn-modal">Close</button>
     </Modal>

    <h2 style={{color: "white", textAlign: "center"}}>Page {page}:</h2>

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
              page={page}
              reviewLimit={reviewLimit}/>
    </div>
  )
}

export default App