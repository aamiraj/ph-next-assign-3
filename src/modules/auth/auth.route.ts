import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../utils/validateRequest";
import { insertUserValidatoinSchema } from "../User/user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(insertUserValidatoinSchema),
  AuthController.signUpUser,
);

export const AuthRoutes = router;
