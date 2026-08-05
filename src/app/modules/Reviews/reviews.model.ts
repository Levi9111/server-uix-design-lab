import { Schema, model } from 'mongoose';
import { TReview } from './reviews.interface';

const reviewSchema = new Schema<TReview>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    testimonial: { type: String, required: true, trim: true },
    roi: { type: String, default: '' },
    revenue: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    color: { type: String, default: 'from-blue-500 to-indigo-600' },
    stats: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

export const ReviewModel = model<TReview>('Review', reviewSchema);
