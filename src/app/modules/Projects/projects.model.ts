import { Schema, model } from 'mongoose';
import { TProjects } from './projects.interface';

const projectsSchema = new Schema<TProjects>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectImageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Projects = model<TProjects>('Projects', projectsSchema);
