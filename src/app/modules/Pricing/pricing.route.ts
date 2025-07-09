import { Router } from 'express';
import { PricingControllers } from './pricing.controller';
import validateRequest from '../../middlewares/validateRequest';
import { PricingValidations } from './pricing.validation';

const router = Router();

router.get('/', PricingControllers.getAllPricing);

router.get('/:id', PricingControllers.getSinglePricing);

router.post(
  '/',
  validateRequest(PricingValidations.createPricingPlanSchema),
  PricingControllers.createPricing,
);

router.patch(
  '/update-plan/:id',
  validateRequest(PricingValidations.updatePricingPlanSchema),
  PricingControllers.updatePricing,
);

router.delete('/delete-plan/:id', PricingControllers.deletePricing);

export const PricingRoute = router;
