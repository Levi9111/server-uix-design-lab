import { z } from 'zod';

const updateSiteConfigValidationSchema = z.object({
  body: z.object({
    primaryEmail: z.string().email('Invalid email address').optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    calendlyUrl: z.string().optional(),
    telegramLink: z.string().optional(),
    telegramBotToken: z.string().optional(),
    telegramChatId: z.string().optional(),
    socialLinks: z
      .object({
        behance: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
        dribbble: z.string().optional(),
      })
      .optional(),
  }),
});

export const SiteConfigValidation = {
  updateSiteConfigValidationSchema,
};
