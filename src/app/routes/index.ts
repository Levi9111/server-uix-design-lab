import { Router, Request, Response } from 'express';
import { FAQsRoute } from '../modules/FAQs/faqs.route';
import { PricingRoute } from '../modules/Pricing/pricing.route';

const router = Router();

const testRoute = (_req: Request, res: Response) => {
  const message = 'Server for UIX Design Lab';
  res.send(message);
};

const moduleRoutes = [
  {
    path: '/',
    router: testRoute,
  },
  {
    path: '/faq',
    router: FAQsRoute,
  },
  {
    path: '/pricing',
    router: PricingRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
