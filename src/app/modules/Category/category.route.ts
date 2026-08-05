import express from 'express';
import validateRequest from '../../utils/validateRequest';
import auth from '../../middlewares/auth.middleware';
import { CategoryControllers } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.get('/', CategoryControllers.getAllCategories);
router.post(
  '/',
  auth('ADMIN'),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);
router.delete('/:id', auth('ADMIN'), CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
