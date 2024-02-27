// Import necessary modules and files
import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

// Declare a variable to hold the server instance
let server: Server

// Define an asynchronous function for the main logic of the application
async function main() {
  try {
    // Connect to the MongoDB database using the provided URL from the configuration
    // await mongoose.connect('mongodb://127.0.0.1:27017/PH-university-management')
    await mongoose.connect(config.db_url_atlas as string)

    // the following line if seeding a super admin is required
    // seedSuperAdmin();

    // Start the server and listen on the specified port
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`)
    })
  } catch (err) {
    // Handle any errors that occur during the main execution
    console.log(err)
  }
}

// Call the main function to start the application
main()

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.log(`😈 unhandled Rejection is detected, shutting down ...`, err)

  // If the server is running, close it before exiting the process
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }

  // Exit the process with an error status code
  process.exit(1)
})

// Handle uncaught exceptions
process.on('uncaughtException', () => {
  console.log(`😈 uncaught Exception is detected, shutting down ...`)

  // Exit the process with an error status code
  process.exit(1)
})
