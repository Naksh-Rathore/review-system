import CompanyInfo from "./components/Company-Info/Company-Info.component.jsx"
import Review from "./components/Reviews/Reviews.component.jsx"
import Paginate from "./components/Paginate/Paginate.component.jsx"
import StarClicker from "./components/Star-Clicker/Star-Clicker.component.jsx"

import { getAverageReview, ratingToImage } from "./utils/review-methods.util.js"
import { getReviews } from "./utils/fetch-api.util.js"

import { useEffect, useState, useRef } from "react"
import Modal from "react-modal"

Modal.setAppElement('#root')

function App() {
  const [avgImage, setAvgImage] = useState("")
  const [reviews, setReviews] = useState([])

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