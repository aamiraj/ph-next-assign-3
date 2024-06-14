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

export const SlotController = {
  insertSlots,
};
