import AppError from '../../errors/AppError';
import { TReviews } from './reviews.interface';
import { Reviews } from './reviews.model';
import httpStatus from 'http-status';
import { Request } from 'express';
import { fileUploader } from 'src/app/utils/fileUploader';

// Create Review
const createReviewIntoDB = async (req: Request) => {
  if (req.file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
    req.body.product.imageUrl = uploadToCloudinary.secure_url;
  }

  const { review } = req.body;

  const result = await Reviews.create(review);
  return result;
};

// Update Review — allow all fields to be updated
const updateReviewIntoDB = async (id: string, payload: Partial<TReviews>) => {
  const review = await Reviews.findById(id);

  if (!review) throw new AppError(httpStatus.NOT_FOUND, 'Review Not Found');

  for (const [key, value] of Object.entries(payload)) {
    (review as any)[key as keyof TReviews] = value;
  }

  const result = await review.save();
  return result;
};

// Get All Reviews
const getAllReviewsFromDB = async () => {
  const result = await Reviews.find({ isDeleted: false });
  return result;
};

// Get Single Review
const getSingleReviewFromDB = async (id: string) => {
  const result = await Reviews.findById(id);

  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Review Not Found');

  return result;
};

// Soft Delete Review
const deleteReviewFromDB = async (id: string) => {
  const deletedReview = await Reviews.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  if (!deletedReview) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete review!');
  }

  return deletedReview;
};

export const ReviewsServices = {
  createReviewIntoDB,
  updateReviewIntoDB,
  getAllReviewsFromDB,
  getSingleReviewFromDB,
  deleteReviewFromDB,
};
