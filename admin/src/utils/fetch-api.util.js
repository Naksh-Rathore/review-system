import axios from "axios"

export async function getReviews(url) {
    try {
        const res = await axios.get(url)

        if (res.status !== 200) {
            throw new Error("Response was not ok!")
        }

        return res.data
    }

    catch(error) {
        throw new Error(`Could not fetch data: ${error}`)
    }
}