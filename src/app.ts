// ====== app.ts ======
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', router)

// default route
app.get('/', (req: Request, res: Response) => {
  res.json('As-salamu alaykum!')
})

// Global error handler
app.use(globalErrorHandler)

// 404 error handler
app.use(notFound)

export default app
