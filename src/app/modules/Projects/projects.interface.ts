import { Types } from 'mongoose';

export type TProject = {
  title: string;
  description: string;
  image: string;
  categoryId: Types.ObjectId;
  redirectUrl: string;
};
