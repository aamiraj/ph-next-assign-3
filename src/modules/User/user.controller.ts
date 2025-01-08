import { Request, Response } from "express";
import { higherOrderController } from "../../utils/higherOrderController";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserServices } from "./user.service";

const getAllUsers = higherOrderController(async (req: Request, res: Response) => {
    const result = await UserServices.getAllUsersFromDb();

    sendResponse(res, {
        message: "All users retrieved successfully.",
        statusCode: httpStatus.OK,
        success: true,
        data: result
    })
})

const updateUserRole = higherOrderController(async (req: Request, res: Response) => {
    const result = await UserServices.updateUserRoleInDb(req.body);

    sendResponse(res, {
        message: "Updated the user role successfully.",
        statusCode: httpStatus.OK,
        success: true,
        data: result
    })
})

export const UserController = {
    getAllUsers,
    updateUserRole
}