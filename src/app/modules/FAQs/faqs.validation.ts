import { z } from 'zod';

const createFAQSchema = z.object({
  body: z.object({
    question: z.string({ message: 'Question is required' }),
    answer: z.string({ message: 'Answer is required' }),
    iconName: z.string({ message: 'Icon name is required' }),
    category: z.string().optional(),
    order: z.number().optional(),
  }),
});

const updateFAQSchema = z.object({
  body: z.object({
    question: z.string().optional(),
    answer: z.string().optional(),
    iconName: z.string().optional(),
    category: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const FAQValidation = {
  createFAQSchema,
  updateFAQSchema,
};
