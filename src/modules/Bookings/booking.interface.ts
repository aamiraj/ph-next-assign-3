import { Types } from "mongoose";
import { CarTypes } from "./booking.constant";

type TCarTypes = (typeof CarTypes)[number];

export interface IBooking {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: TCarTypes;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}

export interface IBookingPayload extends IBooking {
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
}
