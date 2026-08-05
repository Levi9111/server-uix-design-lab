import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.sendTelegramNotification(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Message sent successfully',
    data: result,
  });
});

const initiateBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.initiateBooking(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking initiated successfully',
    data: result,
  });
});

export const BookingControllers = {
  sendMessage,
  initiateBooking,
};
