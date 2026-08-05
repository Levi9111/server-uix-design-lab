import { TReview } from './reviews.interface';
import { ReviewModel } from './reviews.model';

const createReviewIntoDB = async (payload: TReview) => {
  return await ReviewModel.create(payload);
};

const getAllReviewsFromDB = async () => {
  return await ReviewModel.find();
};

const getReviewByIdFromDB = async (id: string) => {
  return await ReviewModel.findById(id);
};

const updateReviewInDB = async (id: string, payload: Partial<TReview>) => {
  return await ReviewModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteReviewFromDB = async (id: string) => {
  return await ReviewModel.findByIdAndDelete(id);
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
  getReviewByIdFromDB,
  updateReviewInDB,
  deleteReviewFromDB,
};
