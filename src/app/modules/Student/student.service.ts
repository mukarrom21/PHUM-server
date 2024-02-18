import { TStudent } from './student.interface'
import { StudentModel } from './student.model'

// //-- Service to create new student
// const createNewStudentService = async (payload: TStudent) => {
//   // // create an instance
//   // const student = new StudentModel(payload)
//   // check if user already exist than throw new error
//   if (await StudentModel.isUserExists(payload.id)) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Sorry, user is already exists')
//   }

//   const result = await StudentModel.create(payload)
//   return result
// }

//-- service to get all students
const getAllStudentsService = async () => {
  const result = await StudentModel.find()
  return result
}

//-- service to get single student by student-id
const getSingleStudentService = async (id: string) => {
  const result = await StudentModel.findOne({ id })
  return result
}

//-- service to update single student by student-id
const updateSingleStudentService = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const result = await StudentModel.findOneAndUpdate(
    { id },
    { $set: payload },
    { new: true },
  )
  return result
}

//-- service to delete single student by student-id
const deleteSingleStudentService = async (id: string) => {
  const result = await StudentModel.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true },
  )
  return result
}

//-- service to aggregate
const aggregateService = async () => {
  const result = await StudentModel.aggregate([{ $match: {} }])
  return result
}

export const StudentServices = {
  // createNewStudentService,
  getAllStudentsService,
  getSingleStudentService,
  updateSingleStudentService,
  deleteSingleStudentService,
  aggregateService,
}
