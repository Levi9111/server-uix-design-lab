import { Router } from 'express';
import { FAQsContorllers } from './faqs.controller';
import validateRequest from '../../middlewares/validateRequest';
import { faqValidations } from './faqs.validation';

const router = Router();

router.get('/', FAQsContorllers.getAllFAQs);

router.get('/:id', FAQsContorllers.getSingleFAQ);

router.post(
  '/',
  validateRequest(faqValidations.createFAQValidationSchema),
  FAQsContorllers.createFAQ,
);

router.patch(
  '/update-faq/id',
  validateRequest(faqValidations.updateFAQValidationSchema),
  FAQsContorllers.updateFAQ,
);

router.delete('/delete-faq/:id', FAQsContorllers.deleteFAQ);

export const FAQsRoute = router;
