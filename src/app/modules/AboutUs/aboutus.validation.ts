import { z } from 'zod';

const updateAboutUsSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    stats: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    values: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          iconName: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const AboutUsValidation = {
  updateAboutUsSchema,
};
