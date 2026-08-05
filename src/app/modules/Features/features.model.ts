import { Schema, model } from 'mongoose';
import { TFeature } from './features.interface';

const featureSchema = new Schema<TFeature>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    iconName: { type: String, required: true, default: 'Sparkles' },
    tag: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const FeatureModel = model<TFeature>('Feature', featureSchema);
