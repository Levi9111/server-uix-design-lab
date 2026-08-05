import express from 'express';
import validateRequest from '../../utils/validateRequest';
import auth from '../../middlewares/auth.middleware';
import { PricingControllers } from './pricing.controller';
import { PricingValidation } from './pricing.validation';

const router = express.Router();

router.get('/', PricingControllers.getAllPricingPlans);
router.get('/:id', PricingControllers.getPricingPlanById);
router.post(
  '/',
  auth('ADMIN'),
  validateRequest(PricingValidation.createPricingPlanSchema),
  PricingControllers.createPricingPlan,
);
router.patch(
  '/:id',
  auth('ADMIN'),
  validateRequest(PricingValidation.updatePricingPlanSchema),
  PricingControllers.updatePricingPlan,
);
router.delete('/:id', auth('ADMIN'), PricingControllers.deletePricingPlan);

export const PricingRoutes = router;
