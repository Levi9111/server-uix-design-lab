import { z } from 'zod';

const createFeatureSchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }),
    description: z.string({ message: 'Description is required' }),
    iconName: z.string({ message: 'Icon name is required' }),
    tag: z.string().optional(),
    order: z.number().optional(),
  }),
});

const updateFeatureSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    iconName: z.string().optional(),
    tag: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const FeatureValidation = {
  createFeatureSchema,
  updateFeatureSchema,
};
