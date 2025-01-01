import mongoose from "mongoose";
import { IFeedback } from "./feedback.interface";

const feedbackSchema = new mongoose.Schema<IFeedback>({
    review: {
        type: String
    },
    rating: {
        type: Number
    },
    date: {
        type: String
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId
    },
    customerEmail: {
        type: String
    },
    customerName: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
})

export const Feedback = mongoose.model("Feedback", feedbackSchema)