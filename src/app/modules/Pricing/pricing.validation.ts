import { z } from 'zod';

const createPricingPlanSchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }),
    price: z.number({ message: 'Price is required' }),
    period: z.string().optional(),
    description: z.string({ message: 'Description is required' }),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
    isPopular: z.boolean().optional(),
    ctaText: z.string().optional(),
    order: z.number().optional(),
  }),
});

const updatePricingPlanSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.number().optional(),
    period: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.string()).optional(),
    isPopular: z.boolean().optional(),
    ctaText: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const PricingValidation = {
  createPricingPlanSchema,
  updatePricingPlanSchema,
};
