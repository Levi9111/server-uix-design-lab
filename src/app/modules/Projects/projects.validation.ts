import { z } from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    project: z.object({
      title: z
        .string()
        .trim()
        .min(1, 'Title is required')
        .max(100, 'Title cannot be more than 100 characters'),

      description: z.string().trim().min(1, 'Description is required'),

      projectImageUrl: z
        .string()
        .url('Project image URL must be a valid URL')
        .optional()
        .or(z.literal('')),
    }),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, 'Title is required')
      .max(100, 'Title cannot be more than 100 characters')
      .optional(),

    description: z.string().trim().min(1, 'Description is required').optional(),

    projectImageUrl: z
      .string()
      .url('Project image URL must be a valid URL')
      .optional(),
  }),
});

export const ProjectValidations = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
