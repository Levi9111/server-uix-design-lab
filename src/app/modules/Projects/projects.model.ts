import { Schema, model } from 'mongoose';
import { TProject } from './projects.interface';

const projectSchema = new Schema<TProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    redirectUrl: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const ProjectModel = model<TProject>('Project', projectSchema);
