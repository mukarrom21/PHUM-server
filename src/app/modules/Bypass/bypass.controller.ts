import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BypassServices } from './bypass.service'

const changePasswordController = catchAsync(async (req, res) => {
  const result = await BypassServices.changePasswordService(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'password changed successfully',
    data: result,
  })
})

export const BypassControllers = {
  changePasswordController,
}
