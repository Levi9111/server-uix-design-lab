import { ReviewsServices } from './reviews.service';
import sendResponse from './../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from './../../utils/catchAsync';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewsServices.createReviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (_req, res) => {
  const result = await ReviewsServices.getAllReviewsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All reviews retrieved successfully',
    data: result,
  });
});

const getSingleReview = catchAsync(async (req, res) => {
  const result = await ReviewsServices.getSingleReviewFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const result = await ReviewsServices.updateReviewIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  await ReviewsServices.deleteReviewFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
  });
});

export const ReviewsControllers = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
