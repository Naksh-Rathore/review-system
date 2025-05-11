import { useState, useEffect } from "react"

function StarClicker({ setRating }) {
    // Set default rating to 5 stars
    const [starStatus , setStarStatus] = useState([true, true, true, true, true])

    useEffect(() => {
        setRating(5)
    }, [setRating])

    const handleClick = index => {
        // index + 1 is to change inclusive array index to exclusive rating
        setRating(index + 1)

        setStarStatus(s => s.map((_, i) => i <= index))
    }

    return (
        <>
            <h3 style={{fontSize: "25px"}}>Enter Rating: </h3>
            <div className="star-clicker">
                {starStatus.map((isSelected, index) => (
                    <p style={{display: "inline", fontSize: "30px", cursor: "pointer"}} key={index} onClick={() => handleClick(index)}>{isSelected ? "★" : "☆"}</p>
                ))}
            </div>
        </>
    )
}

export default StarClicker