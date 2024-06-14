import httpStatus from "http-status";
import APIError from "../../errors/APIError";
import { ISlot } from "./slot.interface";
import { generateSlots } from "../../utils/generateSlots";
import Slot from "./slot.model";
import Service from "../Services/service.model";

const insertSlotsToDb = async (payload: Partial<ISlot>) => {
  try {
    const service = Service.findById(payload?.service);

    if (!service) {
      throw new APIError("No service found.", httpStatus.NOT_FOUND);
    }

    const slots = generateSlots(
      payload?.startTime as string,
      payload?.endTime as string,
    );

    const serviceSlots = slots.map((slot) => {
      return { ...payload, startTime: slot.startTime, endTime: slot.endTime };
    });

    const newServiceSlots = Slot.create(serviceSlots);

    return newServiceSlots;
  } catch (error) {
    throw new APIError("Slots created failed.", httpStatus.BAD_REQUEST);
  }
};

export const SlotService = {
  insertSlotsToDb,
};
