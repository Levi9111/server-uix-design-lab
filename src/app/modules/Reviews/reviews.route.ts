import { Router, Request, Response, NextFunction } from 'express';
import { ReviewValidations } from './reviews.validation';
import { fileUploader } from '../../utils/fileUploader';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewsControllers } from './reviews.controller';

const router = Router();

router.post(
  '/create-review',
  fileUploader.upload.single('file'),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewsControllers.createReview,
);

router.patch(
  '/update-review/:id',
  validateRequest(ReviewValidations.updateReviewValidationSchema),
  ReviewsControllers.updateReview,
);

router.get('/', ReviewsControllers.getAllReviews);

router.get('/:id', ReviewsControllers.getSingleReview);

router.delete('/delete-review/:id', ReviewsControllers.deleteReview);

export const ReviewsRoute = router;
