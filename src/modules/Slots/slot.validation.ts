import mongoose from "mongoose";
import { z } from "zod";
import { SlotStatus } from "./slot.constant";

const timeMatch = new RegExp(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/);

const insertSlotValidationSchema = z.object({
  body: z
    .object({
      service: z.string().refine(
        (val) => {
          return mongoose.Types.ObjectId.isValid(val);
        },
        { message: "Must be a valid ObjectId." },
      ),
      date: z.string({ message: "Must be YYYY-MM-DD format." }).date(),
      startTime: z
        .string()
        .regex(timeMatch, { message: "Time must be HH:MM format." }),
      endTime: z
        .string()
        .regex(timeMatch, { message: "Time must be HH:MM format." }),
      isBooked: z.enum(SlotStatus).optional(),
    })
    .refine(
      ({ startTime, endTime }) => {
        const start = new Date(`1970-01-01T${startTime}:00Z`);
        const end = new Date(`1970-01-01T${endTime}:00Z`);

        return start < end;
      },
      { message: "Start time must be before end time." },
    ),
});

export const SlotValidation = {
  insertSlotValidationSchema,
};
