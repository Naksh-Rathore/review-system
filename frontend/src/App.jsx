import CompanyInfo from "./components/Company-Info/Company-Info.component.jsx"
import { getAverageReview, ratingToImage } from "./utils/review-methods.util.js"
import { getReviews } from "./utils/fetch-api.util.js"
import { useEffect, useState } from "react"

function App() {
    const [avgImage, setAvgImage] = useState("")
    
    useEffect(() => {
        const fetchAndLog = async () => {
          const res = await getReviews("http://localhost:8080/api/reviews")
          const numericalReview = getAverageReview(res)
          setAvgImage(ratingToImage(numericalReview))
        }
    
        fetchAndLog()
      }, [])

  return (
    <div className="container">
      <CompanyInfo avgImage={avgImage}/>
    </div>
  )
}

export default App
