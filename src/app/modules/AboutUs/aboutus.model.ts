import { Schema, model } from 'mongoose';
import { TAboutUs } from './aboutus.interface';

const aboutUsSchema = new Schema<TAboutUs>(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    stats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    values: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        iconName: { type: String, default: 'Sparkles' },
      },
    ],
  },
  { timestamps: true },
);

export const AboutUsModel = model<TAboutUs>('AboutUs', aboutUsSchema);
