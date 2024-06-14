import { Schema, model } from "mongoose";
import { IService } from "./service.interface";
import { ServiceDurationTime } from "../Slots/slot.constant";

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: ServiceDurationTime,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Service = model<IService>("Service", serviceSchema);

export default Service;
