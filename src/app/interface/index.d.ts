// Import the JwtPayload type from the 'jsonwebtoken' module
import { JwtPayload } from 'jsonwebtoken';

// Declare a global namespace for Express
declare global {
  // Extend the Express.Request interface to include a 'user' property of type JwtPayload
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}


/* 
An index.d.ts file in a TypeScript project is typically used to provide type declarations for the TypeScript compiler. It serves as a way to define custom types, interfaces, or augment existing types that are not natively recognized by TypeScript or to extend types from external libraries.

In the example you provided, the index.d.ts file is extending the Express.Request interface in the global namespace to include a custom property user with the type JwtPayload. This is commonly done when you want to augment the types in an external library (in this case, Express) to include additional information or properties.

So, the purpose of the index.d.ts file is to ensure that TypeScript understands and recognizes the custom modifications or additions to the types used in your project, providing better type checking and tooling support. */