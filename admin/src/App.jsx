import CompanyInfo from "./components/Company-Info/Company-Info.component.jsx"
import Review from "./components/Reviews/Reviews.component.jsx"
import Paginate from "./components/Paginate/Paginate.component.jsx"
import LoginForm from "./components/Login-Form/Login-Form.jsx"

import { ratingToImage } from "./utils/review-methods.util.js"
import { getData } from "./utils/fetch-api.util.js"

import { useEffect, useState, useRef } from "react"
import Modal from "react-modal"

import "./Modal.css"

Modal.setAppElement('#root')

function App() {
  const [avgImage, setAvgImage] = useState("")
  const [reviews, setReviews] = useState([])

  const [page, setPage] = useState(1)
  const totalReviews = useRef(0)

  const [modalIsOpen, setModalIsOpen] = useState(true)

  const reviewLimit = 10
    
  useEffect(() => {
      const fetchAndLog = async () => {
      const reviewRes = await getData(`http://localhost:8080/api/reviews/paginate/${page}/${reviewLimit}`) 
      const avgRating = await getData("http://localhost:8080/api/reviews/average")
      
      if (reviewRes) {
        setAvgImage(ratingToImage(avgRating.averageRating))
        setReviews(reviewRes.data)
        totalReviews.current = reviewRes.totalReviews
      }
    }
    
      fetchAndLog()
  }, [page])  

  return (
    <div className="container">
    <Modal
      className="modal"
      overlayClassName="modal-overlay"
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Example Modal"
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}>
        <LoginForm setModalIsOpen={setModalIsOpen}/>
      </Modal>

      <CompanyInfo avgImage={avgImage} /><br />

    <div className="page-btn">
      <button disabled>Page {page}</button>
    </div>

    {reviews.map(review => (
      <Review
        key={review._id}
        username={review.username}
        rating={review.rating}
        comment={review.comment}
        id={review._id}
        setReviews={setReviews}
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