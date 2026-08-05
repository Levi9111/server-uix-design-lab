export type TPricingPlan = {
  title: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  order?: number;
};
