import { Request } from "express";
import User from "./user.model"

const getAllUsersFromDb = async () => {
    const users = await User.find();
    return users
}

const updateUserRoleInDb = async (req: Request) => {
    const userId = req.params?.id;
    const role = req.body;

    const result = await User.findByIdAndUpdate(userId, role);

    return result
}

export const UserServices = {
    getAllUsersFromDb,
    updateUserRoleInDb
}