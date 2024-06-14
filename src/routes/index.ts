import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ServiceRoutes } from "../modules/Services/service.route";

const router = express.Router();
const routes = [
  // {
  //   path: "/",
  //   router: "",
  // },
  {
    path: "/auth",
    routes: AuthRoutes,
  },
  {
    path: "/services",
    routes: ServiceRoutes,
  },
  // {
  //   path: "/slots",
  //   router: "",
  // },
  // {
  //   path: "/bookings",
  //   router: "",
  // },
];

routes.forEach((route) => router.use(route.path, route.routes));

export default router;
