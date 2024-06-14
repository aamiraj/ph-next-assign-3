import httpStatus from "http-status";
import APIError from "../../errors/APIError";
import { IService } from "./service.interface";
import Service from "./service.model";

const insertServiceToDb = async (payload: Partial<IService>) => {
  try {
    const newService = await Service.create(payload);

    return newService;
  } catch (error) {
    throw new APIError("Service creation failed.", httpStatus.BAD_REQUEST);
  }
};

const getAServiceFromDb = async (id: string) => {
  try {
    const service = await Service.findById(id);

    if (!service) {
      throw new APIError("Service not found.", httpStatus.NOT_FOUND);
    }

    return service;
  } catch (error) {
    throw new APIError("Service not found.", httpStatus.BAD_REQUEST);
  }
};

const getAllServicesFromDb = async () => {
  try {
    const services = await Service.find();

    if (services.length === 0) {
      throw new APIError("Services not found.", httpStatus.NOT_FOUND);
    }

    return services;
  } catch (error) {
    throw new APIError("Services not found.", httpStatus.BAD_REQUEST);
  }
};

const updateServiceIntoDb = async (id: string, payload: Partial<IService>) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(id, payload, {
      runValidators: true,
      new: true,
    });

    if (!updatedService) {
      throw new APIError("Service not found.", httpStatus.NOT_FOUND);
    }

    return updatedService;
  } catch (error) {
    throw new APIError("Service not updated.", httpStatus.BAD_REQUEST);
  }
};

const deleteServiceFromDb = async (id: string) => {
  try {
    const deletedService = await Service.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, runValidators: true },
    );

    if (!deletedService) {
      throw new APIError("Service not found.", httpStatus.NOT_FOUND);
    }

    return deletedService;
  } catch (error) {
    throw new APIError("Service not deleted.", httpStatus.BAD_REQUEST);
  }
};

export const ServiceService = {
  insertServiceToDb,
  getAServiceFromDb,
  getAllServicesFromDb,
  updateServiceIntoDb,
  deleteServiceFromDb,
};
