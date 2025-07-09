import { z } from 'zod';

const createPricingPlanSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    price: z.number(),
    icon: z.enum(['Monitor', 'Rocket', 'ShieldCheck']),
    features: z
      .array(z.string().min(1, 'Feature cannot be empty'))
      .min(1, 'At least one feature is required'),
  }),
});

const updatePricingPlanSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  price: z.number().optional(),
  icon: z.enum(['Monitor', 'Rocket', 'ShieldCheck']).optional(),
  features: z
    .array(z.string().min(1, 'Feature cannot be empty'))
    .min(1, 'At least one feature is required')
    .optional(),
});

export const PricingValidations = {
  createPricingPlanSchema,
  updatePricingPlanSchema,
};
