import { z } from 'zod';

const contactMessageSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    service: z.string().optional(),
    budget: z.string().optional(),
    message: z.string({ message: 'Message is required' }),
  }),
});

const bookingInitiateSchema = z.object({
  body: z.object({
    service: z.string().optional(),
    budget: z.string().optional(),
    features: z.array(z.string()).optional(),
    notes: z.string().optional(),
  }),
});

export const BookingValidation = {
  contactMessageSchema,
  bookingInitiateSchema,
};
