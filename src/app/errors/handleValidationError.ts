// Import the necessary modules and types from external files
import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// Define a function to handle Mongoose validation errors and convert them into a generic error response
const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  // Extract error sources from the validation error object
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path, // Extract the path of the error source
        message: val?.message, // Extract the error message
      };
    },
  );

  // Set a default HTTP status code for validation errors
  const statusCode = 400;

  // Return a generic error response with the extracted information
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

// Export the function for use in other modules
export default handleValidationError;
