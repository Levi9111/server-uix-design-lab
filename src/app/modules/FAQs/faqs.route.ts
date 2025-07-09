import { Router } from 'express';
import { FAQsContorllers } from './faqs.controller';

const router = Router();

router.get('/', FAQsContorllers.getAllFAQs);

router.get('/:id', FAQsContorllers.getSingleFAQ);

router.post('/', FAQsContorllers.createFAQ);

router.patch('/id', FAQsContorllers.updateFAQ);

router.delete('/:id', FAQsContorllers.deleteFAQ);

export const FAQsRouter = router;
