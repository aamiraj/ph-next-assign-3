import express from "express";

const router = express.Router();
const routes = [
  {
    path: "/",
    router: "",
  },
  {
    path: "/auth",
    router: "",
  },
  {
    path: "/services",
    router: "",
  },
  {
    path: "/slots",
    router: "",
  },
  {
    path: "/bookings",
    router: "",
  },
];

routes.forEach((route) => router.use(route.path, route.router));
export default router;
