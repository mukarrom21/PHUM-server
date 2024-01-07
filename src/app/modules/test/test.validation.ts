import { z } from 'zod'

const createTestValidation = z.object({
  body: z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    price: z.number().positive(),
    image: z.string().min(3).max(255),
    quantity: z.number().positive(),
    category: z.string().min(3).max(255),
    status: z.boolean(),
  }),
})

// updateTestValidation
const updateTestValidation = z.object({
  body: z.object({
    name: z.string().min(3).max(255).optional(),
    description: z.string().min(3).max(255).optional(),
    price: z.number().positive().optional(),
    image: z.string().min(3).max(255).optional(),
    quantity: z.number().positive().optional(),
    category: z.string().min(3).max(255).optional(),
    status: z.boolean().optional(),
  }),
})

export const TestValidations = {
  createTestValidation,
  updateTestValidation,
}
