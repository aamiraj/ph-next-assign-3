import { Types } from "mongoose";
import { SlotStatus } from "./slot.constant";

type TSlotStatus = (typeof SlotStatus)[number]

export interface ISlot {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: TSlotStatus;
}
