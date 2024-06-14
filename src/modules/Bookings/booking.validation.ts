import mongoose from "mongoose";
import { z } from "zod";
import { CarTypes } from "./booking.constant";

const insertBookingValidationSchema = z.object({
  body: z.object({
    serviceId: z.string().refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: "Must be a valid ObjectId." },
    ),
    slotId: z.string().refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: "Must be a valid ObjectId." },
    ),
    vehicleType: z.enum(CarTypes),
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number().refine(
      (val) => {
        // pattern match for 19XX or 20XX
        const yearPattern = /(19|20)\d{2}/;
        const stringYear = val.toString();
        return yearPattern.test(stringYear);
      },
      { message: "Must be a valid year." },
    ),
    registrationPlate: z.string(),
  }),
});

export const BookingValidation = { insertBookingValidationSchema };
