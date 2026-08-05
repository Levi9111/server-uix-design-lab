import express from 'express';
import validateRequest from '../../utils/validateRequest';
import auth from '../../middlewares/auth.middleware';
import { FeatureControllers } from './features.controller';
import { FeatureValidation } from './features.validation';

const router = express.Router();

router.get('/', FeatureControllers.getAllFeatures);
router.get('/:id', FeatureControllers.getFeatureById);
router.post(
  '/',
  auth('ADMIN'),
  validateRequest(FeatureValidation.createFeatureSchema),
  FeatureControllers.createFeature,
);
router.patch(
  '/:id',
  auth('ADMIN'),
  validateRequest(FeatureValidation.updateFeatureSchema),
  FeatureControllers.updateFeature,
);
router.delete('/:id', auth('ADMIN'), FeatureControllers.deleteFeature);

export const FeatureRoutes = router;
