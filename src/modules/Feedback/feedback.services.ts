import { Request } from "express";
import { Feedback } from "./feedback.model";
import User from "../User/user.model";
import httpStatus from "http-status";
import APIError from "../../errors/APIError";

export const addFeedbackIntoDB = async (payload: Request) => {
    const customerEmail = payload.user.email;

    const customer = await User.findOne({ email: customerEmail }).exec();

    if (!customer) {
        throw new APIError("Customer with this email not found.", httpStatus.NOT_FOUND)
    }

    const feedbackData = {
        review: payload?.body?.review,
        rating: payload?.body?.rating,
        date: payload?.body?.date,
        customer: customer?._id,
        customerEmail: customer?.email,
        customerName: customer?.name
    }

    const newFeedback = await Feedback.create(feedbackData)

    return newFeedback
}

export const findAllFeedbacksFromDB = async () => {
    const feedbacks = await Feedback.find({ isDeleted: false });

    return feedbacks
}

export const findMyFeedbacksFromDB = async (email: string) => {
    const feedbacks = await Feedback.find({ customerEmail: email, isDeleted: false });

    return feedbacks
}

