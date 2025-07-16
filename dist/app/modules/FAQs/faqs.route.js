"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQsRoute = void 0;
const express_1 = require("express");
const faqs_controller_1 = require("./faqs.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faqs_validation_1 = require("./faqs.validation");
const router = (0, express_1.Router)();
router.get('/', faqs_controller_1.FAQsContorllers.getAllFAQs);
router.get('/:id', faqs_controller_1.FAQsContorllers.getSingleFAQ);
router.post('/', (0, validateRequest_1.default)(faqs_validation_1.faqValidations.createFAQValidationSchema), faqs_controller_1.FAQsContorllers.createFAQ);
router.patch('/update-faq/:id', (0, validateRequest_1.default)(faqs_validation_1.faqValidations.updateFAQValidationSchema), faqs_controller_1.FAQsContorllers.updateFAQ);
router.delete('/delete-faq/:id', faqs_controller_1.FAQsContorllers.deleteFAQ);
exports.FAQsRoute = router;
//# sourceMappingURL=faqs.route.js.map