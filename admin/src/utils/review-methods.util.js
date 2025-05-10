export function ratingToImage(rating) {
    let finalStr = ""

    finalStr += "★".repeat(rating)
    finalStr += "☆".repeat(5 - rating)

    return finalStr
}