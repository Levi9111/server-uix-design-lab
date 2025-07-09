import { model, Schema } from 'mongoose';
import { TPricing } from './pricing.interface';

const pricingSchema = new Schema<TPricing>(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    icon: { type: String, required: true },
    features: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const Pricing = model<TPricing>('Pricing', pricingSchema);
