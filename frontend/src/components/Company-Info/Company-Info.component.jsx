import { getAverageReview } from "../../utils/review-methods.util.js"
import { getReviews } from "../../utils/fetch-api.util.js"
import { useEffect, useState } from "react"
import logo from '../../assets/brewtide-logo.png';
import "./Company-Info.css"

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
            <img src={logo} alt="BrewTide Logo" width="150px"/>
            <h1>BrewTide</h1>
            <h4>"Brew the calm, ride the tide"</h4>
            <h3>Average Rating: {avg || "Loading..."} Stars</h3>
        </>
    )  
}

export default CompanyInfo