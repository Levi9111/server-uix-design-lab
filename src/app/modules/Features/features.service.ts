import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFeatures } from './features.interface';
import { Feature } from './features.model';

// Create Feature
const createFeatureIntoDB = async (payload: TFeatures) => {
  const result = await Feature.create(payload);
  return result;
};

// Update Feature
const updateFeatureIntoDB = async (id: string, payload: Partial<TFeatures>) => {
  const feature = await Feature.findById(id);

  if (!feature) {
    throw new AppError(httpStatus.NOT_FOUND, 'Feature Not Found');
  }

  for (const [key, value] of Object.entries(payload)) {
    (feature as any)[key as keyof TFeatures] = value;
  }

  const result = await feature.save();
  return result;
};

// Get All Features
const getAllFeaturesFromDB = async () => {
  const result = await Feature.find();
  return result;
};

// Get Single Feature
const getSingleFeatureFromDB = async (id: string) => {
  const result = await Feature.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Feature Not Found');
  }

  return result;
};

// Delete Feature
const deleteFeatureFromDB = async (id: string) => {
  const deleted = await Feature.findByIdAndDelete(id);

  if (!deleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Feature!');
  }

  return deleted;
};

export const FeaturesServices = {
  createFeatureIntoDB,
  updateFeatureIntoDB,
  getAllFeaturesFromDB,
  getSingleFeatureFromDB,
  deleteFeatureFromDB,
};
