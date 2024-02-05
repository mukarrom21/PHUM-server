// Define a type representing sources of errors, including the path and error message
export type TErrorSources = {
    path: string | number;
    message: string;
  }[];
  
  // Define a type for a generic error response, including status code, message, and error sources
  export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
  };