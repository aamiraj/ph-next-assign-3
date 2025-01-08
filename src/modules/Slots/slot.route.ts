import express from "express";
import { SlotController } from "./slot.controller";
import { validateRequest } from "../../utils/validateRequest";
import { SlotValidation } from "./slot.validation";
const router = express.Router();

router.get(
    "/availability",
    SlotController.getAllAvailableSlots
);

router.patch(
    "/:id",
    (req, res, next) => { console.log(req.body); next() },
    validateRequest(SlotValidation.updateSlotStatusValidationSchema), SlotController.updateSlotStatus
);

export const SlotRoutes = router;
