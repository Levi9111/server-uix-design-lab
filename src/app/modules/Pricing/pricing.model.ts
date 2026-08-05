import { Schema, model } from 'mongoose';
import { TPricingPlan } from './pricing.interface';

const pricingPlanSchema = new Schema<TPricingPlan>(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    period: { type: String, required: true, default: '/month' },
    description: { type: String, required: true, trim: true },
    features: [{ type: String, required: true }],
    isPopular: { type: Boolean, default: false },
    ctaText: { type: String, default: 'Get Started' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const PricingModel = model<TPricingPlan>('PricingPlan', pricingPlanSchema);
