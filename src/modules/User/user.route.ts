import express from "express";
import verifyToken from "../../middlewares/verifyToken";
import { UserController } from "./user.controller";
import { validateRequest } from "../../utils/validateRequest";
import { updateUserRoleValidationSchema } from "./user.validation";

const router = express.Router();

router.get("/",
    verifyToken(["superAdmin", "admin"]),
    UserController.getAllUsers
)

router.patch("/:id",
    verifyToken(["superAdmin", "admin"]),
    validateRequest(updateUserRoleValidationSchema),
    UserController.updateUserRole
)

export const UserRouters = router;