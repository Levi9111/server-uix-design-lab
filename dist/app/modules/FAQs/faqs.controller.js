"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQsContorllers = void 0;
const faqs_service_1 = require("./faqs.service");
const sendResponse_1 = __importDefault(require("./../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("./../../utils/catchAsync");
const createFAQ = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await faqs_service_1.FAQsServices.createFAQIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'FAQ created successfully',
        data: result,
    });
});
const getAllFAQs = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const result = await faqs_service_1.FAQsServices.getAllFAQsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All FAQs retrieved Successfully',
        data: result,
    });
});
const getSingleFAQ = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await faqs_service_1.FAQsServices.getSingleFAQFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'FAQ retrieved successfully',
        data: result,
    });
});
const updateFAQ = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await faqs_service_1.FAQsServices.updateFAQIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'FAQ Updated Successfully',
        data: result,
    });
});
const deleteFAQ = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await faqs_service_1.FAQsServices.deleteFAQFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'FAQ Deleted Successfully',
    });
});
exports.FAQsContorllers = {
    createFAQ,
    getAllFAQs,
    getSingleFAQ,
    updateFAQ,
    deleteFAQ,
};
//# sourceMappingURL=faqs.controller.js.map