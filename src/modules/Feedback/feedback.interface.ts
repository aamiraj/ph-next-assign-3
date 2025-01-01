import mongoose from "mongoose";

export interface IFeedback {
    review: string;
    rating: number;
    date: string;
    customer: mongoose.Types.ObjectId;
    customerName: string;
    customerEmail: string;
    isDeleted: boolean;
}