"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsControllers = void 0;
const reviews_service_1 = require("./reviews.service");
const sendResponse_1 = __importDefault(require("./../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("./../../utils/catchAsync");
const createReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await reviews_service_1.ReviewsServices.createReviewIntoDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review created successfully',
        data: result,
    });
});
const getAllReviews = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const result = await reviews_service_1.ReviewsServices.getAllReviewsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All reviews retrieved successfully',
        data: result,
    });
});
const getSingleReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await reviews_service_1.ReviewsServices.getSingleReviewFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review retrieved successfully',
        data: result,
    });
});
const updateReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await reviews_service_1.ReviewsServices.updateReviewIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review updated successfully',
        data: result,
    });
});
const deleteReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await reviews_service_1.ReviewsServices.deleteReviewFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review deleted successfully',
    });
});
exports.ReviewsControllers = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
//# sourceMappingURL=reviews.controller.js.map