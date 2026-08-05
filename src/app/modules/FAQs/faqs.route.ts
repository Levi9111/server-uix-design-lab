import express from 'express';
import validateRequest from '../../utils/validateRequest';
import auth from '../../middlewares/auth.middleware';
import { FAQControllers } from './faqs.controller';
import { FAQValidation } from './faqs.validation';

const router = express.Router();

router.get('/', FAQControllers.getAllFAQs);
router.get('/:id', FAQControllers.getFAQById);
router.post(
  '/',
  auth('ADMIN'),
  validateRequest(FAQValidation.createFAQSchema),
  FAQControllers.createFAQ,
);
router.patch(
  '/:id',
  auth('ADMIN'),
  validateRequest(FAQValidation.updateFAQSchema),
  FAQControllers.updateFAQ,
);
router.delete('/:id', auth('ADMIN'), FAQControllers.deleteFAQ);

export const FAQRoutes = router;
