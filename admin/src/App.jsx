import CompanyInfo from "./components/Company-Info/Company-Info.component.jsx"
import Review from "./components/Reviews/Reviews.component.jsx"
import Paginate from "./components/Paginate/Paginate.component.jsx"
import StarClicker from "./components/Star-Clicker/Star-Clicker.component.jsx"

import { ratingToImage } from "./utils/review-methods.util.js"
import { getData } from "./utils/fetch-api.util.js"

import { useEffect, useState, useRef } from "react"

function App() {
  const [avgImage, setAvgImage] = useState("")
  const [reviews, setReviews] = useState([])

  const [page, setPage] = useState(1)
  const totalReviews = useRef(0)

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
      <CompanyInfo avgImage={avgImage} /><br />

    <div className="page-btn">
      <button disabled>Page {page}</button>
    </div>

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