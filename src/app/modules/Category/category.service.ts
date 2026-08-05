import { TCategory } from './category.interface';
import { CategoryModel } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  if (!payload.slug) {
    payload.slug = payload.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  }
  const result = await CategoryModel.create(payload);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await CategoryModel.find();
  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const result = await CategoryModel.findByIdAndDelete(id);
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  deleteCategoryFromDB,
};
