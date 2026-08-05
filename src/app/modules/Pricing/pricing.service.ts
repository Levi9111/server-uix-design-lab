import { TPricingPlan } from './pricing.interface';
import { PricingModel } from './pricing.model';

const createPricingPlanIntoDB = async (payload: TPricingPlan) => {
  return await PricingModel.create(payload);
};

const getAllPricingPlansFromDB = async () => {
  return await PricingModel.find().sort({ order: 1 });
};

const getPricingPlanByIdFromDB = async (id: string) => {
  return await PricingModel.findById(id);
};

const updatePricingPlanInDB = async (id: string, payload: Partial<TPricingPlan>) => {
  return await PricingModel.findByIdAndUpdate(id, payload, { new: true });
};

const deletePricingPlanFromDB = async (id: string) => {
  return await PricingModel.findByIdAndDelete(id);
};

export const PricingServices = {
  createPricingPlanIntoDB,
  getAllPricingPlansFromDB,
  getPricingPlanByIdFromDB,
  updatePricingPlanInDB,
  deletePricingPlanFromDB,
};
