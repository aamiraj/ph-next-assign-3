import { z } from "zod";

export const addFeedbackValidation = z.object({
    body: z.object({
        review: z.string(),
        rating: z.number().min(0, { message: "Rating must be between 0-5." }).max(5, { message: "Rating must be between 0-5." }),
        date: z.string().date(),
        customerEmail: z.string().email().optional(),
    })
})