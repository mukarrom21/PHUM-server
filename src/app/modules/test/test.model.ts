import { Schema, model } from 'mongoose'
import { ITest } from './test.interface'

// create a schema based on the interface
const testSchema = new Schema<ITest>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    price: Number,
    image: String,
    quantity: Number,
    category: String,
    status: Boolean,
  },
  {
    timestamps: true,
  },
)

// create a model from the schema
const TestModel = model<ITest>('Test', testSchema)

export default TestModel
