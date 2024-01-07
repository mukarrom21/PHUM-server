import { ITest } from './test.interface'
import TestModel from './test.model'

// service to create a test
const createTestService = async (payload: ITest) => {
  // create a new test
  const result = await TestModel.create(payload)
  // return the result
  return result
}

// service to get all tests
const getAllTestsService = async () => {
  // get all tests
  const result = await TestModel.find()
  // return the result
  return result
}

// service to get a single test
const getSingleTestService = async (id: string) => {
  const result = await TestModel.findById(id)
  return result
}

// service to update a test
const updateTestService = async (id: string, payload: Partial<ITest>) => {
  const result = await TestModel.findByIdAndUpdate(id, payload, { new: true })
  return result
}

// service to delete a test
const deleteTestService = async (id: string) => {
  const result = await TestModel.findByIdAndDelete(id)
  return result
}

export const TestServices = {
  createTestService,
  getAllTestsService,
  getSingleTestService,
  updateTestService,
  deleteTestService,
}
