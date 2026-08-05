import express from 'express';
import validateRequest from '../../utils/validateRequest';
import auth from '../../middlewares/auth.middleware';
import { SiteConfigControllers } from './siteconfig.controller';
import { SiteConfigValidation } from './siteconfig.validation';

const router = express.Router();

router.get('/', SiteConfigControllers.getSiteConfig);
router.patch(
  '/',
  auth('ADMIN'),
  validateRequest(SiteConfigValidation.updateSiteConfigValidationSchema),
  SiteConfigControllers.updateSiteConfig,
);

export const SiteConfigRoutes = router;
