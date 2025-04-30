import axios from "axios"

export async function getReviews(url) {
    try {
        const response = await axios.get(url)

        if (response.status !== 200) {
            throw new Error("Response was not ok!");
        }

        return response.data
    }

    catch(error) {
        throw new Error(`Could not fetch data: ${error}`)
    }
}