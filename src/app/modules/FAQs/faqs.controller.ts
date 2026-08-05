import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FAQServices } from './faqs.service';

const createFAQ = catchAsync(async (req: Request, res: Response) => {
  const result = await FAQServices.createFAQIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'FAQ created successfully',
    data: result,
  });
});

const getAllFAQs = catchAsync(async (_req: Request, res: Response) => {
  const result = await FAQServices.getAllFAQsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'FAQs fetched successfully',
    data: result,
  });
});

const getFAQById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FAQServices.getFAQByIdFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'FAQ fetched successfully',
    data: result,
  });
});

const updateFAQ = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FAQServices.updateFAQInDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'FAQ updated successfully',
    data: result,
  });
});

const deleteFAQ = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FAQServices.deleteFAQFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'FAQ deleted successfully',
    data: result,
  });
});

export const FAQControllers = {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
};
