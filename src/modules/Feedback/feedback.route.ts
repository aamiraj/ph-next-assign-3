import express from "express"
import verifyToken from "../../middlewares/verifyToken"
import { validateRequest } from "../../utils/validateRequest"
import { addFeedbackValidation } from "./feedback.validation"
import { addFeedback, findFeedbacks, findMyFeedbacks } from "./feedback.controller"

const router = express.Router()

router.post("/", verifyToken(["user"]), validateRequest(addFeedbackValidation), addFeedback)

router.get("/all", findFeedbacks)

router.get("/me", verifyToken(["user"]), findMyFeedbacks)

export const FeedbackRoutes = router