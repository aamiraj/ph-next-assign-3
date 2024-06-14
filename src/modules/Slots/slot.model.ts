import { Schema, model } from "mongoose";
import { ISlot } from "./slot.interface";
import { SlotStatus } from "./slot.constant";

const slotSchema = new Schema<ISlot>(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: {
      type: String,
      required: true,
      enum: SlotStatus,
      default: "available",
    },
  },
  {
    timestamps: true,
  },
);

const Slot = model("Slot", slotSchema);

export default Slot;
