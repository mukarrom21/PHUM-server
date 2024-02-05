// Import necessary modules and types from external files
import { RequestHandler } from "express";
import httpStatus from "http-status";

// Define a middleware to handle 404 (Not Found) errors
const notFound: RequestHandler = (req, res, next) => {
  // Return a JSON response with the 404 status code and a corresponding message
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found",
    error: "API not found, Please check your API carefully!",
  });
};

// Export the middleware for use in other modules
export default notFound;
