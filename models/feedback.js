import mongoose, { model } from "mongoose";

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const feedbackModel = model("Feedback", feedbackSchema)