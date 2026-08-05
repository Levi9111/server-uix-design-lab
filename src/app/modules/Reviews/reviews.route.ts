import express from 'express';
import validateRequest from '../../utils/validateRequest';
import auth from '../../middlewares/auth.middleware';
import { ReviewControllers } from './reviews.controller';
import { ReviewValidation } from './reviews.validation';

const router = express.Router();

router.get('/', ReviewControllers.getAllReviews);
router.get('/:id', ReviewControllers.getReviewById);
router.post(
  '/',
  auth('ADMIN'),
  validateRequest(ReviewValidation.createReviewSchema),
  ReviewControllers.createReview,
);
router.patch(
  '/:id',
  auth('ADMIN'),
  validateRequest(ReviewValidation.updateReviewSchema),
  ReviewControllers.updateReview,
);
router.delete('/:id', auth('ADMIN'), ReviewControllers.deleteReview);

export const ReviewRoutes = router;
