import { Router, Request, Response } from 'express';
import { FAQsRoute } from '../modules/FAQs/faqs.route';
import { PricingRoute } from '../modules/Pricing/pricing.route';
import { FeaturesRoute } from '../modules/Features/features.route';
import { ProjectRoutes } from '../modules/Projects/projects.route';
import { ReviewsRoute } from '../modules/Reviews/reviews.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/faqs',
    router: FAQsRoute,
  },
  {
    path: '/pricing',
    router: PricingRoute,
  },
  {
    path: '/features',
    router: FeaturesRoute,
  },
  {
    path: '/projects',
    router: ProjectRoutes,
  },
  {
    path: '/reviews',
    router: ReviewsRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
