import express from "express";
import verifyToken from "../../middlewares/verifyToken";
import { validateRequest } from "../../utils/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";

const adminRouter = express.Router();
const userRouter = express.Router();

// create a booking
userRouter.post(
  "/",
  verifyToken,
  validateRequest(BookingValidation.insertBookingValidationSchema),
  BookingController.insertBooking,
);

// get my bookings
userRouter.get("/", verifyToken, BookingController.getMyBookings);

// get all the booking
adminRouter.get("/", verifyToken, BookingController.getAllTheBookings);

export const BookingRoutes = { adminRouter, userRouter };
