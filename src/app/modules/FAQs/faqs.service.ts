import { TFAQ } from './faqs.interface';
import { FAQModel } from './faqs.model';

const createFAQIntoDB = async (payload: TFAQ) => {
  return await FAQModel.create(payload);
};

const getAllFAQsFromDB = async () => {
  return await FAQModel.find().sort({ order: 1 });
};

const getFAQByIdFromDB = async (id: string) => {
  return await FAQModel.findById(id);
};

const updateFAQInDB = async (id: string, payload: Partial<TFAQ>) => {
  return await FAQModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteFAQFromDB = async (id: string) => {
  return await FAQModel.findByIdAndDelete(id);
};

export const FAQServices = {
  createFAQIntoDB,
  getAllFAQsFromDB,
  getFAQByIdFromDB,
  updateFAQInDB,
  deleteFAQFromDB,
};
