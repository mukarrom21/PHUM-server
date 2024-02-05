// Import necessary modules and types from external files
import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import catchAsync from '../utils/catchAsync'

// Define a middleware function to validate incoming requests against a Zod schema
const validateRequest = (schema: AnyZodObject) => {
  // Use the catchAsync utility to handle asynchronous operations and errors
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Parse and validate the request data against the provided schema
    await schema.parseAsync({
      body: req.body,      // Validate request body
      cookies: req.cookies // Validate request cookies
    })

    // Move to the next middleware or route handler if validation succeeds
    next()
  })
}

// Export the middleware for use in other modules
export default validateRequest
