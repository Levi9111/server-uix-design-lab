import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TPricing } from './pricing.interface';
import { Pricing } from './pricing.model';

// Create Pricing Plan
const createPricingIntoDB = async (payload: TPricing) => {
  const result = await Pricing.create(payload);
  return result;
};

// Update Pricing Plan
const updatePricingIntoDB = async (id: string, payload: Partial<TPricing>) => {
  const pricing = await Pricing.findById(id);

  if (!pricing) {
    throw new AppError(httpStatus.NOT_FOUND, 'Pricing Plan Not Found');
  }

  for (const [key, value] of Object.entries(payload)) {
    (pricing as any)[key as keyof TPricing] = value;
  }

  const result = await pricing.save();
  return result;
};

// Get All Pricing Plans
const getAllPricingFromDB = async () => {
  const result = await Pricing.find();
  return result;
};

// Get Single Pricing Plan
const getSinglePricingFromDB = async (id: string) => {
  const result = await Pricing.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Pricing Plan Not Found');
  }

  return result;
};

// Delete Pricing Plan
const deletePricingFromDB = async (id: string) => {
  const deleted = await Pricing.findByIdAndDelete(id);

  if (!deleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete Pricing Plan!',
    );
  }

  return deleted;
};

export const PricingServices = {
  createPricingIntoDB,
  updatePricingIntoDB,
  getAllPricingFromDB,
  getSinglePricingFromDB,
  deletePricingFromDB,
};
