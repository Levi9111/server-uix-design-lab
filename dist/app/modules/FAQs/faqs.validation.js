"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createFAQValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        question: zod_1.default.string(),
        answer: zod_1.default.string(),
    }),
});
const updateFAQValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        question: zod_1.default.string(),
        answer: zod_1.default.string(),
    }),
});
exports.faqValidations = {
    createFAQValidationSchema,
    updateFAQValidationSchema,
};
//# sourceMappingURL=faqs.validation.js.map