import mongoose from "mongoose"

const ReviewSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter username"]
        },

        comment: {
            type: String,
            required: [true, "Please enter comment"]
        },

        rating: {
            type: Number,
            required: [true, "Please enter rating"]
        },
    },

    {
        timestamps: true
    }
)

const review = mongoose.model("Review", ReviewSchema)

export default review