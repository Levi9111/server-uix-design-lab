import AppError from 'src/app/errors/AppError';
import { TFAQ } from './faqs.interface';
import { FAQ } from './faqs.model';
import httpStatus from 'http-status';

const createFAQIntoDB = async (payload: TFAQ) => {
  const result = await FAQ.create(payload);

  return result;
};

const updateFAQIntoDB = async (id: string, payload: Partial<TFAQ>) => {
  const faq = await FAQ.findById(id);

  if (!faq) throw new AppError(httpStatus.NOT_FOUND, 'FAQ Not Found');

  for (const [key, value] of Object.entries(payload)) {
    (faq as any)[key as keyof TFAQ] = value;
  }

  const result = await faq.save();

  return result;
};

const getAllFAQsFromDB = async () => {
  const result = await FAQ.find({ isDeleted: false });

  return result;
};

const getSingleFAQFromDB = async (id: string) => {
  const result = await FAQ.findById(id);

  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'FAQ Not Found');

  return result;
};

const deleteFAQFromDB = async (id: string) => {
  const deletedFAQ = await FAQ.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  if (!deletedFAQ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete FAQ!');
  }
};

export const FAQsServices = {
  createFAQIntoDB,
  updateFAQIntoDB,
  getAllFAQsFromDB,
  getSingleFAQFromDB,
  deleteFAQFromDB,
};
