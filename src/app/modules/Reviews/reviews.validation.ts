import { z } from 'zod';

const createReviewSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    role: z.string({ message: 'Role is required' }),
    company: z.string({ message: 'Company is required' }),
    testimonial: z.string({ message: 'Testimonial is required' }),
    roi: z.string().optional(),
    revenue: z.string().optional(),
    avatarUrl: z.string().optional(),
    color: z.string().optional(),
    stats: z.record(z.string(), z.string()).optional(),
  }),
});

const updateReviewSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    company: z.string().optional(),
    testimonial: z.string().optional(),
    roi: z.string().optional(),
    revenue: z.string().optional(),
    avatarUrl: z.string().optional(),
    color: z.string().optional(),
    stats: z.record(z.string(), z.string()).optional(),
  }),
});

export const ReviewValidation = {
  createReviewSchema,
  updateReviewSchema,
};
