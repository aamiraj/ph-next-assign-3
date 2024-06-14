import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../utils/validateRequest";
import { insertUserValidatoinSchema } from "../User/user.validation";
import { logInUserValidationSchema } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(insertUserValidatoinSchema),
  AuthController.signUpUser,
);

router.post("/login", validateRequest(logInUserValidationSchema), AuthController.logInUser)

export const AuthRoutes = router;
