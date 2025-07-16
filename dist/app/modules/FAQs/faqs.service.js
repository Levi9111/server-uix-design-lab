"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQsServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const faqs_model_1 = require("./faqs.model");
const http_status_1 = __importDefault(require("http-status"));
const createFAQIntoDB = async (payload) => {
    const result = await faqs_model_1.FAQ.create(payload);
    return result;
};
const updateFAQIntoDB = async (id, payload) => {
    const faq = await faqs_model_1.FAQ.findById(id);
    if (!faq)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'FAQ Not Found');
    for (const [key, value] of Object.entries(payload)) {
        faq[key] = value;
    }
    const result = await faq.save();
    return result;
};
const getAllFAQsFromDB = async () => {
    const result = await faqs_model_1.FAQ.find({ isDeleted: false });
    return result;
};
const getSingleFAQFromDB = async (id) => {
    const result = await faqs_model_1.FAQ.findById(id);
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'FAQ Not Found');
    return result;
};
const deleteFAQFromDB = async (id) => {
    const deletedFAQ = await faqs_model_1.FAQ.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    if (!deletedFAQ) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete FAQ!');
    }
};
exports.FAQsServices = {
    createFAQIntoDB,
    updateFAQIntoDB,
    getAllFAQsFromDB,
    getSingleFAQFromDB,
    deleteFAQFromDB,
};
//# sourceMappingURL=faqs.service.js.map