import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ServiceRoutes } from "../modules/Services/service.route";
import { SlotRoutes } from "../modules/Slots/slot.route";
import { BookingRoutes } from "../modules/Bookings/booking.route";
import { FeedbackRoutes } from "../modules/Feedback/feedback.route";

const router = express.Router();
const routes = [
  {
    path: "/auth",
    routes: AuthRoutes,
  },
  {
    path: "/services",
    routes: ServiceRoutes,
  },
  {
    path: "/slots",
    routes: SlotRoutes,
  },
  {
    path: "/bookings",
    routes: BookingRoutes.bookings,
  },
  {
    path: "/feedback",
    routes: FeedbackRoutes,
  },
  {
    path: "/my-bookings",
    routes: BookingRoutes.myBookings,
  },
];

routes.forEach((route) => router.use(route.path, route.routes));

export default router;
