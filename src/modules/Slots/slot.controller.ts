import httpStatus from "http-status";
import { higherOrderController } from "../../utils/higherOrderController";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import { SlotService } from "./slot.service";

const insertSlots = higherOrderController(
  async (req: Request, res: Response) => {
    const result = await SlotService.insertSlotsToDb(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Slots created successfully.",
      data: result,
    });
  },
);

const getAllAvailableSlots = higherOrderController(
  async (req: Request, res: Response) => {
    const results = await SlotService.getAllAvailableSlotsFromDb(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Slots retrieved successfully.",
      data: results,
    });
  },
);

const updateSlotStatus = higherOrderController(async (req: Request, res: Response) => {
  const results = await SlotService.updateSlotStatusInDb(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots updated successfully.",
    data: results,
  });
})

export const SlotController = {
  insertSlots,
  getAllAvailableSlots,
  updateSlotStatus
};
