import { z } from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }),
    description: z.string({ message: 'Description is required' }),
    image: z.string({ message: 'Image URL is required' }),
    categoryId: z.string({ message: 'Category ID is required' }),
    redirectUrl: z.string({ message: 'Redirect URL is required' }),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    categoryId: z.string().optional(),
    redirectUrl: z.string().optional(),
  }),
});

export const ProjectValidation = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
