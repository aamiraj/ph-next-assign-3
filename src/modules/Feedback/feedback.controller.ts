import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { higherOrderController } from "../../utils/higherOrderController";
import { addFeedbackIntoDB, findAllFeedbacksFromDB, findMyFeedbacksFromDB } from "./feedback.services";

export const addFeedback = higherOrderController(async (req, res) => {
    const result = await addFeedbackIntoDB(req);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Feedback created successfully.",
        data: result,
    });
})

export const findFeedbacks = higherOrderController(async (req, res) => {
    const result = await findAllFeedbacksFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Feedback found successfully.",
        data: result,
    });
})

export const findMyFeedbacks = higherOrderController(async (req, res) => {
    const result = await findMyFeedbacksFromDB(req.user?.email);
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Feedback found successfully.",
        data: result,
    });
})
