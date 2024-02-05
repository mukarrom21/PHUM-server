// Import necessary modules and types from external files
import { Response } from 'express'

// Define a type for metadata information in the response
type TMeta = {
  limit: number
  page: number
  total: number
  totalPage: number
}

// Define a generic type for the standardized response format
type TResponse<T> = {
  statusCode: number
  success: boolean
  message?: string
  meta?: TMeta
  data: T
}

// Define a utility function to send a standardized response
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  // Send the response with the standardized format
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  })
}

// Export the sendResponse utility function for use in other modules
export default sendResponse
