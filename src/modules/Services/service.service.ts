import httpStatus from "http-status";
import APIError from "../../errors/APIError";
import { IService } from "./service.interface";
import Service from "./service.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { Request } from "express";

const insertServiceToDb = async (payload: Partial<IService>) => {
  const newService = await Service.create(payload);

  return newService;
};

const getAServiceFromDb = async (id: string) => {
  const service = await Service.findById(id);

  return service;
};

const getAllServicesFromDb = async (req: Request) => {
  const serviceQuery = new QueryBuilder(
    Service.find({ isDeleted: false }),
    req?.query
  )
    .searchByNameOrTitle("name")
    .sort();

  const services = await serviceQuery.modelQuery;
  return services;
};

const updateServiceIntoDb = async (id: string, payload: Partial<IService>) => {
  const updatedService = await Service.findByIdAndUpdate(
    id,
    payload,
    {
      runValidators: true,
      new: true,
    }
  );

  if (!updatedService) {
    throw new APIError("Service not found.", httpStatus.NOT_FOUND);
  }

  return updatedService;
};

const deleteServiceFromDb = async (id: string) => {
  const deletedService = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  if (!deletedService) {
    throw new APIError("Service not found.", httpStatus.NOT_FOUND);
  }

  return deletedService;
};

export const ServiceService = {
  insertServiceToDb,
  getAServiceFromDb,
  getAllServicesFromDb,
  updateServiceIntoDb,
  deleteServiceFromDb,
};
