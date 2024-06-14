import { z } from "zod";

const insertServiceValidationScema = z.object({
  body: z.object({
    name: z
      .string({ message: "Name must be string." })
      .min(3, { message: "Must be at least 3 chars." }),
    description: z.string().optional(),
    price: z.number().nonnegative(),
    duration: z.number().nonnegative(),
    isDeleted: z.boolean(),
  }),
});

const updateServiceValidationScema = z.object({
  body: z.object({
    name: z
      .string({ message: "Name must be string." })
      .min(3, { message: "Must be at least 3 chars." })
      .optional(),
    description: z.string().optional(),
    price: z.number().nonnegative().optional(),
    duration: z.number().nonnegative().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ServiceValidation = {
  insertServiceValidationScema,
  updateServiceValidationScema,
};
