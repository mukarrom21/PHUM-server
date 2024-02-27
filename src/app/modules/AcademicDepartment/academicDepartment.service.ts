import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartmentModel } from './academicDepartment.model'

// service to create new academic semester
const createAcademicDepartmentService = async (
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartmentModel.create(payload)
  return result
}

// service to find all academic Department
const findAllAcademicDepartmentService = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academicFaculty')
  return result
}

// service to find single academic Department
const findSingleAcademicDepartmentService = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id)
  return result
}

// service to update academic Department
const updateAcademicDepartmentService = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentService,
  findAllAcademicDepartmentService,
  findSingleAcademicDepartmentService,
  updateAcademicDepartmentService,
}
