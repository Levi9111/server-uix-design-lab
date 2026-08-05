import express from 'express';
import validateRequest from '../../utils/validateRequest';
import auth from '../../middlewares/auth.middleware';
import { AboutUsControllers } from './aboutus.controller';
import { AboutUsValidation } from './aboutus.validation';

const router = express.Router();

router.get('/', AboutUsControllers.getAboutUs);
router.patch(
  '/',
  auth('ADMIN'),
  validateRequest(AboutUsValidation.updateAboutUsSchema),
  AboutUsControllers.updateAboutUs,
);

export const AboutUsRoutes = router;
