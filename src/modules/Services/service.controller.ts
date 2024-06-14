import { Request, Response } from "express";
import { higherOrderController } from "../../utils/higherOrderController";
import { ServiceService } from "./service.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import APIError from "../../errors/APIError";

const insertService = higherOrderController(
  async (req: Request, res: Response) => {
    // service creation only allowed as as admin
    if (req.user?.role !== "admin") {
      throw new APIError(
        "You are not authorized to add a service",
        httpStatus.UNAUTHORIZED,
      );
    }

    const result = await ServiceService.insertServiceToDb(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service created successfully.",
      data: result,
    });
  },
);

const getAService = higherOrderController(
  async (req: Request, res: Response) => {
    const result = await ServiceService.getAServiceFromDb(req.params?.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service retrieved successfully.",
      data: result,
    });
  },
);

const getAllServices = higherOrderController(
  async (req: Request, res: Response) => {
    const results = await ServiceService.getAllServicesFromDb();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Services retrieved successfully.",
      data: results,
    });
  },
);

const updateService = higherOrderController(
  async (req: Request, res: Response) => {
    // service creation only allowed as as admin
    if (req.user?.role !== "admin") {
      throw new APIError(
        "You are not authorized to update a service",
        httpStatus.UNAUTHORIZED,
      );
    }

    const result = await ServiceService.updateServiceIntoDb(
      req.params?.id,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service updated successfully.",
      data: result,
    });
  },
);

const deleteService = higherOrderController(
  async (req: Request, res: Response) => {
    // service creation only allowed as as admin
    if (req.user?.role !== "admin") {
      throw new APIError(
        "You are not authorized to delete a service",
        httpStatus.UNAUTHORIZED,
      );
    }

    const result = await ServiceService.deleteServiceFromDb(req.params?.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service deleted successfully.",
      data: result,
    });
  },
);

export const ServiceController = {
  insertService,
  getAService,
  getAllServices,
  updateService,
  deleteService,
};
