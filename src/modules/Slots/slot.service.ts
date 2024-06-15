import httpStatus from "http-status";
import APIError from "../../errors/APIError";
import { ISlot } from "./slot.interface";
import { generateSlots } from "../../utils/generateSlots";
import Slot from "./slot.model";
import Service from "../Services/service.model";

const insertSlotsToDb = async (payload: Partial<ISlot>) => {
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
};

const getAllAvailableSlotsFromDb = async (query: Record<string, unknown>) => {
  const allSlots = Slot.find();

  if (query?.date) {
    allSlots.where("date").equals(query?.date);
  }

  if (query?.serviceId) {
    allSlots.where("service").equals(query?.serviceId);
  }

  const allSlotsExec = await allSlots.populate("service").lean().exec();

  return allSlotsExec;
};

export const SlotService = {
  insertSlotsToDb,
  getAllAvailableSlotsFromDb,
};
