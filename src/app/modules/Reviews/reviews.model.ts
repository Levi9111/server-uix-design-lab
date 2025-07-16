import { model, Schema } from 'mongoose';
import { TReviews } from './reviews.interface';

const reveiwsSchema = new Schema<TReviews>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    roi: {
      type: String,
      required: true,
    },
    avatarInitials: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    stats: {
      type: Map,
      of: String,
      default: {},
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true },
);

reveiwsSchema.pre('save', function (next) {
  if (!this.avatarInitials && this.name) {
    this.avatarInitials = this.name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }

  next();
});

export const Reviews = model<TReviews>('Reviews', reveiwsSchema);
