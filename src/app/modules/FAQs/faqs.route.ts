import { Router } from 'express';
import { FAQsControllers } from './faqs.controller';
import validateRequest from '../../middlewares/validateRequest';
import { faqValidations } from './faqs.validation';

const router = Router();

router.get('/', FAQsControllers.getAllFAQs);

router.get('/:id', FAQsControllers.getSingleFAQ);

router.post(
  '/',
  validateRequest(faqValidations.createFAQValidationSchema),
  FAQsControllers.createFAQ,
);

router.patch(
  '/update-faq/:id',
  validateRequest(faqValidations.updateFAQValidationSchema),
  FAQsControllers.updateFAQ,
);

router.delete('/delete-faq/:id', FAQsControllers.deleteFAQ);

export const FAQsRoute = router;
