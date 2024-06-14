import httpStatus from "http-status";
import APIError from "../../errors/APIError";
import Booking from "./booking.model";
import { Request } from "express";
import User from "../User/user.model";

const insertBookingToDb = async (payload: Request) => {
  try {
    const user = payload.user;

    const customer = await User.findOne({ email: user?.email });

    if (!customer?._id) {
      throw new APIError(
        "No customer found, booking cannot be done.",
        httpStatus.BAD_REQUEST,
      );
    }

    const { serviceId, slotId, ...remainings } = payload.body;

    const newBookingObject = {
      ...remainings,
      service: serviceId,
      slot: slotId,
      customer: customer?._id,
    };

    const newBooking = await Booking.create(newBookingObject);

    const recentlyCreatedBooking = await Booking.findById(newBooking?._id)
      .populate("customer", "-role -createdAt -updatedAt -__v")
      .populate("service", "-createdAt -updatedAt -__v")
      .populate("slot", "-createdAt -updatedAt -__v");

    return recentlyCreatedBooking;
  } catch (error) {
    throw new APIError("Booking creation failed.", httpStatus.BAD_REQUEST);
  }
};

const getAllTheBookingsFromDb = async () => {
  try {
    const allBookings = await Booking.find()
      .populate("customer", "-role -createdAt -updatedAt -__v")
      .populate("service", "-createdAt -updatedAt -__v")
      .populate("slot", "-createdAt -updatedAt -__v");
    return allBookings;
  } catch (error) {
    throw new APIError("Bookings retrieved failed.", httpStatus.BAD_REQUEST);
  }
};

const getMyBookingsFromDb = async (email: string) => {
  try {
    const customer = await User.findOne({ email: email });

    const filter = {
      customer: customer?._id,
    };
    
    const allBookings = await Booking.find(filter)
      .select("-customer")
      .populate("service", "-createdAt -updatedAt -__v")
      .populate("slot", "-createdAt -updatedAt -__v");

    return allBookings;
  } catch (error) {
    throw new APIError("Bookings retrieved failed.", httpStatus.BAD_REQUEST);
  }
};

export const BookingService = {
  insertBookingToDb,
  getAllTheBookingsFromDb,
  getMyBookingsFromDb,
};
