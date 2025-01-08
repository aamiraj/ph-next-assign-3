import { z } from "zod";
import { Roles } from "./user.constant";

export const insertUserValidatoinSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Must be a string." })
      .min(3, { message: "Must be 3 or more chars for name." })
      .max(30, { message: "Must be 30 or fewer chars for name." }),
    email: z.string({ message: "Must be a string." }).email(),
    password: z
      .string({ message: "Must be a string." })
      .min(6, { message: "Must be 6 chars or more." })
      .regex(/[A-Z]/, { message: "Must have an upeercase letter." })
      .regex(/[a-z]/, { message: "Must have a lowercase letter." })
      .regex(/[0-9]/, { message: "Must have a number." })
      .regex(/[#?!@$%^&*-]/, { message: "Must have a special chars." }),
    role: z.enum(Roles, { message: "Must be a user or admin." }),
    phone: z
      .string({ message: "Must be a string." })
      .regex(/[0-9]{10}/)
      .optional(),
    address: z.string({ message: "Must be a string." }).optional(),
  }),
});

export const updateUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.enum(Roles, { message: "Must be a valid user type." })
  })
})