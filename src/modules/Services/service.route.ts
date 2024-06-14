import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { ServiceController } from "./service.controller";
import verifyToken from "../../middlewares/verifyToken";
import { ServiceValidation } from "./service.validation";

const router = express.Router();

// create a service route
router.post(
  "/",
  verifyToken,
  validateRequest(ServiceValidation.insertServiceValidationScema),
  ServiceController.insertService,
);

// update a service route
router.put(
  "/:id",
  verifyToken,
  validateRequest(ServiceValidation.updateServiceValidationScema),
  ServiceController.updateService,
);

// delete a service route
router.delete("/:id", verifyToken, ServiceController.deleteService);

// get single service route
router.get("/:id", ServiceController.getAService);

// get all the service route
router.get("/", ServiceController.getAllServices);

export const ServiceRoutes = router;
