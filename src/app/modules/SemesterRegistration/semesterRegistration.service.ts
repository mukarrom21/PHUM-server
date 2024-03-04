import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { AcademicSemesterModel } from '../AcademicSemester/academicSemester.model'
import { semesterRegistrationStatus } from './semesterRegistration.constant'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistrationModel } from './semesterRegistration.model'

// create new academic semester
const createSemesterRegistrationService = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester

  // check is semester registration status UPCOMING OR ONGOING
  const isAnySemesterUpcomingOrOngoing =
    await SemesterRegistrationModel.findOne({
      $or: [
        { status: semesterRegistrationStatus.UPCOMING },
        { status: semesterRegistrationStatus.ONGOING },
      ],
    })
  if (isAnySemesterUpcomingOrOngoing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Sorry, There is already ${isAnySemesterUpcomingOrOngoing.status} registered semester!`,
    )
  }
  if (academicSemester) {
    // check is semester exists in semester collection
    const isAcademicSemesterExists =
      await AcademicSemesterModel.findById(academicSemester)
    if (!isAcademicSemesterExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Sorry, This semester is not found!',
      )
    }

    // check is this semester registration already exists
    const isSemesterRegistrationExists =
      await SemesterRegistrationModel.findOne({ academicSemester })
    if (isSemesterRegistrationExists) {
      throw new AppError(
        httpStatus.CONFLICT,
        'Sorry, This semester registration already registered!',
      )
    }
  }

  const result = await SemesterRegistrationModel.create(payload)
  return result
}

// service to find all academic semester
const getAllSemesterRegistrationService = async (
  query: Record<string, unknown>,
) => {
  // create instance of query builder
  const SemesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await SemesterRegistrationQuery.modelQuery
  return result
}

// service to find single academic semester by _id
const getSingleSemesterRegistrationService = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id)
  return result
}

// service to update single academic semester by _id
const updateSemesterRegistrationService = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // Current semester registration info
  const registeredSemester = await SemesterRegistrationModel.findById(id)
  // check if not exist requested semester registration
  if (!registeredSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This registered semester is not found!',
    )
  }

  // check is current semester status ENDED?
  if (registeredSemester?.status === semesterRegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Sorry, This semester is already ${registeredSemester?.status}`,
    )
  }

  // You can not update status directly from "UPCOMING" to "ENDED" or "ONGOING" to "UPCOMING"
  if (
    registeredSemester?.status === semesterRegistrationStatus.UPCOMING &&
    payload?.status === semesterRegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Sorry, you can not change directly from ${registeredSemester?.status} to ${payload?.status}`,
    )
  }
  if (
    registeredSemester?.status === semesterRegistrationStatus.ONGOING &&
    payload?.status === semesterRegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Sorry, you can not change directly from ${registeredSemester?.status} to ${payload?.status}`,
    )
  }

  // update
  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true },
  )
  return result
}

export const AcademicSemesterServices = {
  createSemesterRegistrationService,
  getAllSemesterRegistrationService,
  getSingleSemesterRegistrationService,
  updateSemesterRegistrationService,
}
