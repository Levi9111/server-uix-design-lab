"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const reviews_model_1 = require("./reviews.model");
const http_status_1 = __importDefault(require("http-status"));
const fileUploader_1 = require("../../../app/utils/fileUploader");
const createReviewIntoDB = async (req) => {
    if (req.file) {
        const uploadToCloudinary = await fileUploader_1.fileUploader.uploadToCloudinary(req.file);
        req.body.review.imageUrl = uploadToCloudinary.secure_url;
    }
    const { review } = req.body;
    const result = await reviews_model_1.Reviews.create(review);
    return result;
};
const updateReviewIntoDB = async (id, payload) => {
    const review = await reviews_model_1.Reviews.findById(id);
    if (!review)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Review Not Found');
    for (const [key, value] of Object.entries(payload)) {
        review[key] = value;
    }
    const result = await review.save();
    return result;
};
const getAllReviewsFromDB = async () => {
    const result = await reviews_model_1.Reviews.find({ isDeleted: false });
    return result;
};
const getSingleReviewFromDB = async (id) => {
    const result = await reviews_model_1.Reviews.findById(id);
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Review Not Found');
    return result;
};
const deleteReviewFromDB = async (id) => {
    const deletedReview = await reviews_model_1.Reviews.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    if (!deletedReview) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete review!');
    }
    return deletedReview;
};
exports.ReviewsServices = {
    createReviewIntoDB,
    updateReviewIntoDB,
    getAllReviewsFromDB,
    getSingleReviewFromDB,
    deleteReviewFromDB,
};
//# sourceMappingURL=reviews.service.js.map