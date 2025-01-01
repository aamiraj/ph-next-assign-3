import httpStatus from "http-status";
import { higherOrderController } from "../../utils/higherOrderController";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const insertBooking = higherOrderController(
  async (req: Request, res: Response) => {
    const result = await BookingService.insertBookingToDb(req);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking successful.",
      data: result,
    });
  },
);

const getAllTheBookings = higherOrderController(
  async (req: Request, res: Response) => {
    const result = await BookingService.getAllTheBookingsFromDb();

    if (result?.length === 0) {
      sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "No bookings found.",
        data: [],
      });
      return;
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All bookings retrieved successfully.",
      data: result,
    });
  },
);

const getMyBookings = higherOrderController(
  async (req: Request, res: Response) => {
    const result = await BookingService.getMyBookingsFromDb(req?.user?.email);

    if (result?.length === 0) {
      sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "No bookings found.",
        data: [],
      });
      return;
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User bookings retrieved successfully.",
      data: result,
    });
  },
);
export const BookingController = {
  insertBooking,
  getAllTheBookings,
  getMyBookings,
};
