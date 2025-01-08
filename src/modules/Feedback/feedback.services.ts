import { Request } from "express";
import { Feedback } from "./feedback.model";
import User from "../User/user.model";
import httpStatus from "http-status";
import APIError from "../../errors/APIError";
import QueryBuilder from "../../builder/QueryBuilder";

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

export const findAllFeedbacksFromDB = async (req: Request) => {
    const feedbackQuery = new QueryBuilder(
        Feedback.find({ isDeleted: false }),
        req?.query
    ).sort()

    const feedbacks = await feedbackQuery.modelQuery;

    return feedbacks
}

export const findMyFeedbacksFromDB = async (email: string) => {
    const feedbacks = await Feedback.find({ customerEmail: email, isDeleted: false });

    return feedbacks
}

