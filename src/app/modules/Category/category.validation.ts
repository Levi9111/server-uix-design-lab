import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Category name is required' }),
    slug: z.string().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
};
