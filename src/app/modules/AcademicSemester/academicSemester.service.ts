import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import {
  semesterCodeMonthMapper,
  semesterNameCodeMapper,
} from './academicSemester.constant'
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
} from './academicSemester.interface'
import { AcademicSemesterModel } from './academicSemester.model'

// create new academic semester
const createNewAcademicSemesterService = async (payload: TAcademicSemester) => {
  // add code matching with name
  payload.code = semesterCodeMonthMapper[payload.name].code
  // add startMonth matching with name
  payload.startMonth = semesterCodeMonthMapper[payload.name].startMonth
  // add endMonth matching with name
  payload.endMonth = semesterCodeMonthMapper[payload.name].endMonth

  // check is semester name and code is correct
  if (semesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Sorry! your code is not matching with semester name',
    )
  }

  const result = await AcademicSemesterModel.create(payload)
  return result
}

// service to find all academic semester
const findAllAcademicSemesterService = async () => {
  const result = await AcademicSemesterModel.find()
  return result
}

// service to find single academic semester by _id
const findSingleAcademicSemesterByIdService = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id)
  return result
}

// service to update single academic semester by _id
const updateSingleAcademicSemesterByIdService = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  const updateData: Partial<TAcademicSemester> = { ...payload }

  // automatic match semester name and code
  if (payload.name) {
    updateData.code = semesterNameCodeMapper[
      payload.name
    ] as TAcademicSemesterCode
  } else if (payload.code) {
    const code = Object.keys(semesterNameCodeMapper).find(
      key => semesterNameCodeMapper[key] === payload.code,
    )
    updateData.name = code as TAcademicSemesterName
  }

  // find is same year and name exists
  const isSemesterExist = await AcademicSemesterModel.findOne({
    year: updateData.year,
    name: updateData.name,
  })
  // throw error if exist
  if (isSemesterExist) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This semester is already exists.',
    )
  }

  const result = await AcademicSemesterModel.findByIdAndUpdate(id, updateData, {
    new: true,
  })
  return result
}

export const AcademicSemesterServices = {
  createNewAcademicSemesterService,
  findAllAcademicSemesterService,
  findSingleAcademicSemesterByIdService,
  updateSingleAcademicSemesterByIdService,
}
