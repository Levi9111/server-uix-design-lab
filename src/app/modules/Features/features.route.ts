import { Router } from 'express';
import { FeaturesControllers } from './features.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FeaturesValidations } from './features.validation';

const router = Router();

router.get('/', FeaturesControllers.getAllFeatures);

router.get('/:id', FeaturesControllers.getSingleFeature);

router.post(
  '/',
  validateRequest(FeaturesValidations.createFeatureZodSchema),
  FeaturesControllers.createFeature,
);

router.patch(
  '/update-feature/:id',
  validateRequest(FeaturesValidations.updateFeatureZodSchema),
  FeaturesControllers.updateFeature,
);

router.delete('/delete-feature/:id', FeaturesControllers.deleteFeature);

export const FeaturesRoute = router;
