import z from 'zod';

const createFAQValidationSchema = z.object({
  body: z.object({
    question: z.string(),
    answer: z.string(),
  }),
});

const updateFAQValidationSchema = z.object({
  body: z.object({
    question: z.string(),
    answer: z.string(),
  }),
});

export const faqValidations = {
  createFAQValidationSchema,
  updateFAQValidationSchema,
};
