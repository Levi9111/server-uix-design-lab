export type TReviews = {
  _id?: string;
  title: string;
  name: string;
  role: string;
  description: string;
  roi: string;
  revenue: string;
  avatarInitials: string;
  imageUrl: string;
  color: string;
  stats: {
    [key: string]: string;
  };
  isDeleted: boolean;
};
