import { z } from 'zod';

// Schema for creating a review
const createReviewValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Title is required'),
    name: z.string().trim().min(1, 'Name is required'),
    role: z.string().trim().min(1, 'Role is required'),
    description: z.string().trim().min(1, 'Description is required'),
    roi: z.string().trim().min(1, 'ROI is required'),
    revenue: z.string().trim().min(1, 'Revenue is required'),
    imageUrl: z.string().url('Image URL must be a valid URL'),
    color: z.string().trim().min(1, 'Color is required'),

    // Dynamic stats object
    stats: z.record(z.string().min(1, 'Stat value cannot be empty')).optional(),
  }),
});

// Schema for updating a review — all fields optional
const updateReviewValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().optional(),
    name: z.string().trim().optional(),
    role: z.string().trim().optional(),
    description: z.string().trim().optional(),
    roi: z.string().trim().optional(),
    revenue: z.string().trim().optional(),
    imageUrl: z.string().url('Image URL must be a valid URL').optional(),
    color: z.string().trim().optional(),
    stats: z.record(z.string().min(1)).optional(),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
