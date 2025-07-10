import { model, Schema } from 'mongoose';
import { TFeatures } from './features.interface';

const featureSchema = new Schema<TFeatures>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { timestamps: true },
);

export const Feature = model<TFeatures>('Feature', featureSchema);
