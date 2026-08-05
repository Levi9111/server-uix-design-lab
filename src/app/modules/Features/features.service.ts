import { TFeature } from './features.interface';
import { FeatureModel } from './features.model';

const createFeatureIntoDB = async (payload: TFeature) => {
  return await FeatureModel.create(payload);
};

const getAllFeaturesFromDB = async () => {
  return await FeatureModel.find().sort({ order: 1 });
};

const getFeatureByIdFromDB = async (id: string) => {
  return await FeatureModel.findById(id);
};

const updateFeatureInDB = async (id: string, payload: Partial<TFeature>) => {
  return await FeatureModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteFeatureFromDB = async (id: string) => {
  return await FeatureModel.findByIdAndDelete(id);
};

export const FeatureServices = {
  createFeatureIntoDB,
  getAllFeaturesFromDB,
  getFeatureByIdFromDB,
  updateFeatureInDB,
  deleteFeatureFromDB,
};
