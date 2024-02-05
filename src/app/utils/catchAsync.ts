// Import necessary modules and types from external files
import { NextFunction, Request, RequestHandler, Response } from "express";

// Define a utility function to catch asynchronous errors in route handlers
const catchAsync = (fn: RequestHandler) => {
  // Return a new function that wraps the original route handler
  return (req: Request, res: Response, next: NextFunction) => {
    // Resolve the promise returned by the original route handler
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

// Export the catchAsync utility function for use in other modules
export default catchAsync;
