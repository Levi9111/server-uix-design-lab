import { model, Schema } from 'mongoose';
import { TFAQ } from './faqs.interface';

const faqsShhema = new Schema<TFAQ>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const FAQ = model<TFAQ>('FAQ', faqsShhema);
