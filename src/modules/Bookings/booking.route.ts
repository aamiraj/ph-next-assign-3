import express from "express";
import verifyToken from "../../middlewares/verifyToken";
import { validateRequest } from "../../utils/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";

const myBookings = express.Router();
const bookings = express.Router();

// create a booking
bookings.post(
  "/",
  verifyToken(["user"]),
  validateRequest(BookingValidation.insertBookingValidationSchema),
  BookingController.insertBooking,
);

// get my bookings
myBookings.get("/", verifyToken(["user"]), BookingController.getMyBookings);

// get all the booking
bookings.get("/", verifyToken(["superAdmin", "admin"]), BookingController.getAllTheBookings);

export const BookingRoutes = { bookings, myBookings };
