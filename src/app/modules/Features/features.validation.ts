import { z } from 'zod';

// Create Feature Validation Schema
const createFeatureZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    icon: z.string({ required_error: 'Icon is required' }),
  }),
});

// Update Feature Validation Schema (Partial)
const updateFeatureZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
  }),
});

export const FeaturesValidations = {
  createFeatureZodSchema,
  updateFeatureZodSchema,
};
