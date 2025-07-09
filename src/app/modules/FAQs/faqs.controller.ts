import { FAQsServices } from './faqs.service';
import sendResponse from './../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from './../../utils/catchAsync';

const createFAQ = catchAsync(async (req, res) => {
  const result = await FAQsServices.createFAQIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ created successfully',
    data: result,
  });
});

const getAllFAQs = catchAsync(async (_req, res) => {
  const result = await FAQsServices.getAllFAQsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All FAQs retrieved Successfully',
    data: result,
  });
});

const getSingleFAQ = catchAsync(async (req, res) => {
  const result = await FAQsServices.getSingleFAQFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ retrieved successfully',
    data: result,
  });
});

const updateFAQ = catchAsync(async (req, res) => {
  const result = await FAQsServices.updateFAQIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ Updated Successfully',
    data: result,
  });
});

const deleteFAQ = catchAsync(async (req, res) => {
  await FAQsServices.deleteFAQFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ Deleted Successfully',
  });
});

export const FAQsContorllers = {
  createFAQ,
  getAllFAQs,
  getSingleFAQ,
  updateFAQ,
  deleteFAQ,
};
