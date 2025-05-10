import axios from "axios"

export async function getData(url) {
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

export async function postReview(url, review) {
    try {
        const res = await axios.post(url, review)

        if (res.status !== 200) {
            throw new Error("Response was not ok!")
        }
    }

    catch(error) {
        throw new Error(`Could not fetch data: ${error}`)
    }
}