import httpStatus from "http-status";
import APIError from "../../errors/APIError";
import Booking from "./booking.model";
import { Request } from "express";
import User from "../User/user.model";
import Slot from "../Slots/slot.model";
import mongoose from "mongoose";

const insertBookingToDb = async (payload: Request) => {
  const user = payload.user;

  const customer = await User.findOne({ email: user?.email });

  if (!customer?._id) {
    throw new APIError(
      "No customer found, booking cannot be done.",
      httpStatus.BAD_REQUEST,
    );
  }

  const { service, slot, ...remainings } = payload.body;

  const newBookingObject = {
    ...remainings,
    service: service,
    slot: slot,
    customer: customer?._id,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();


    await Booking.create(newBookingObject, { session });
    await Slot.updateOne({ _id: slot }, { isBooked: "booked" }, { session })

    await session.commitTransaction();

    // const newBooking = await Booking.create(newBookingObject, { session });
    // const recentlyCreatedBooking = await Booking.findById(newBooking?._id)
    //   .populate("customer", "-role -createdAt -updatedAt -__v")
    //   .populate("service", "-createdAt -updatedAt -__v")
    //   .populate("slot", "-createdAt -updatedAt -__v");
    // return recentlyCreatedBooking;
  } catch (error) {
    console.log("An error occurred during the transaction:" + error);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
};

const getAllTheBookingsFromDb = async () => {
  const allBookings = await Booking.find()
    .populate("customer", "-role -createdAt -updatedAt -__v")
    .populate("service", "-createdAt -updatedAt -__v")
    .populate("slot", "-createdAt -updatedAt -__v");
  return allBookings;
};

const getMyBookingsFromDb = async (email: string) => {
  const customer = await User.findOne({ email: email });

  const filter = {
    customer: customer?._id,
  };

  const allBookings = await Booking.find(filter)
    .select("-customer")
    .populate("service", "-createdAt -updatedAt -__v")
    .populate("slot", "-createdAt -updatedAt -__v");

  return allBookings;
};

export const BookingService = {
  insertBookingToDb,
  getAllTheBookingsFromDb,
  getMyBookingsFromDb,
};
