import { getAverageReview } from "../../utils/review-methods.util.js"
import getReviews from "../../utils/fetch-api.util.js"
import { useEffect, useState } from "react"
import logo from '../../assets/brewtide-logo.png';

function CompanyInfo() {
    const [avg, setAvg] = useState(null)
    
    useEffect(() => {
        const fetchAndLog = async () => {
          const res = await getReviews("http://localhost:8080/api/reviews")
          setAvg(getAverageReview(res))
        }
    
        fetchAndLog()
      }, [])

    return (
        <>
            <img src={logo} alt="Brewtide Logo" width="150px"/>
            <p>Average Rating: {avg || "Loading..."}</p>
        </>
    )  
}

export default CompanyInfo