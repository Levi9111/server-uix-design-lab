import { Router } from 'express';
import { ReviewsControllers } from './reviews.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidations } from './reviews.validation';

const router = Router();

router.get('/', ReviewsControllers.getAllReviews);
router.get('/:id', ReviewsControllers.getSingleReview);

router.post(
  '/',
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewsControllers.createReview,
);

router.patch(
  '/update-review/:id',
  validateRequest(ReviewValidations.updateReviewValidationSchema),
  ReviewsControllers.updateReview,
);

router.delete('/delete-review/:id', ReviewsControllers.deleteReview);

export const ReviewsRoute = router;
