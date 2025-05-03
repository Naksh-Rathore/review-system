import CompanyInfo from "./components/Company-Info/Company-Info.component.jsx"
import { getAverageReview, ratingToImage } from "./utils/review-methods.util.js"
import { getReviews } from "./utils/fetch-api.util.js"
import { useEffect, useState } from "react"
import Review from "./components/Reviews/Reviews.component.jsx"
import Modal from "react-modal"

Modal.setAppElement('#root')

function App() {
    const [avgImage, setAvgImage] = useState("")
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [reviews, setReviews] = useState([])
    
    useEffect(() => {
        const fetchAndLog = async () => {
          const res = await getReviews("http://localhost:8080/api/reviews")
          const numericalReview = getAverageReview(res)
          setAvgImage(ratingToImage(numericalReview))

          setReviews(res.map(review => {
            return <Review
              username={review.username}
              rating={review.rating}
              comment={review.comment}
            />
        }))
      }
    
        fetchAndLog()
      }, [])

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
        <input type="text" placeholder="Enter Username"/>
        <input type="number" placeholder="Enter Rating"/>
        <textarea placeholder="Enter Comment"/><br /><br />
        
        <button onClick={() => setModalIsOpen(false)}>Submit</button>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>

      {reviews.current}
    </div>
  )
}

export default App
