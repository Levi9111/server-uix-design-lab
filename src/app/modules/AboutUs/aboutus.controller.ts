import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AboutUsServices } from './aboutus.service';

const getAboutUs = catchAsync(async (_req: Request, res: Response) => {
  const result = await AboutUsServices.getAboutUsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'About Us content fetched successfully',
    data: result,
  });
});

const updateAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutUsServices.updateAboutUsInDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'About Us content updated successfully',
    data: result,
  });
});

export const AboutUsControllers = {
  getAboutUs,
  updateAboutUs,
};
