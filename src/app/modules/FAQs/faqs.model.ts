import { Schema, model } from 'mongoose';
import { TFAQ } from './faqs.interface';

const faqSchema = new Schema<TFAQ>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    iconName: { type: String, required: true, default: 'HelpCircle' },
    category: { type: String, default: 'General' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const FAQModel = model<TFAQ>('FAQ', faqSchema);
