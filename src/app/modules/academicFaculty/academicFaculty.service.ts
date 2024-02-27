import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyModel } from './academicFaculty.model'

// service to create new academic semester
const createAcademicFacultyService = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload)
  return result
}

// service to find all academic faculty
const findAllAcademicFacultyService = async () => {
  const result = await AcademicFacultyModel.find()
  return result
}

// service to find single academic faculty
const findSingleAcademicFacultyService = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id)
  return result
}

// service to update academic faculty
const updateAcademicFacultyService = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const AcademicFacultyServices = {
  createAcademicFacultyService,
  findAllAcademicFacultyService,
  findSingleAcademicFacultyService,
  updateAcademicFacultyService,
}
