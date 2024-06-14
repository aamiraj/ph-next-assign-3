import { Schema, model } from "mongoose";
import { IService } from "./service.interface";

const serviceSchema = new Schema<IService>({
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
    default: 60,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Service = model<IService>("Service", serviceSchema);

export default Service;
