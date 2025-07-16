"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRoute = void 0;
const express_1 = require("express");
const reviews_validation_1 = require("./reviews.validation");
const fileUploader_1 = require("../../utils/fileUploader");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const reviews_controller_1 = require("./reviews.controller");
const router = (0, express_1.Router)();
router.post('/create-review', fileUploader_1.fileUploader.upload.single('file'), (req, _res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(reviews_validation_1.ReviewValidations.createReviewValidationSchema), reviews_controller_1.ReviewsControllers.createReview);
router.patch('/update-review/:id', (0, validateRequest_1.default)(reviews_validation_1.ReviewValidations.updateReviewValidationSchema), reviews_controller_1.ReviewsControllers.updateReview);
router.get('/', reviews_controller_1.ReviewsControllers.getAllReviews);
router.get('/:id', reviews_controller_1.ReviewsControllers.getSingleReview);
router.delete('/delete-review/:id', reviews_controller_1.ReviewsControllers.deleteReview);
exports.ReviewsRoute = router;
//# sourceMappingURL=reviews.route.js.map