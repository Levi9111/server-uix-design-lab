import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { ProjectRoutes } from '../modules/Projects/projects.route';
import { SiteConfigRoutes } from '../modules/SiteConfig/siteconfig.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { ReviewRoutes } from '../modules/Reviews/reviews.route';
import { FAQRoutes } from '../modules/FAQs/faqs.route';
import { PricingRoutes } from '../modules/Pricing/pricing.route';
import { AboutUsRoutes } from '../modules/AboutUs/aboutus.route';
import { FeatureRoutes } from '../modules/Features/features.route';
// --- INJECT IMPORTS HERE ---

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/categories', route: CategoryRoutes },
  { path: '/projects', route: ProjectRoutes },
  { path: '/site-config', route: SiteConfigRoutes },
  { path: '/booking', route: BookingRoutes },
  { path: '/reviews', route: ReviewRoutes },
  { path: '/faqs', route: FAQRoutes },
  { path: '/pricing', route: PricingRoutes },
  { path: '/about-us', route: AboutUsRoutes },
  { path: '/features', route: FeatureRoutes },
  // --- INJECT ROUTES HERE ---
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
