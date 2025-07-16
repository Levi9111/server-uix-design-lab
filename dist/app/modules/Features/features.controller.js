"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const features_service_1 = require("./features.service");
const createFeature = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await features_service_1.FeaturesServices.createFeatureIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Feature created successfully',
        data: result,
    });
});
const getAllFeatures = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const result = await features_service_1.FeaturesServices.getAllFeaturesFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Features retrieved successfully',
        data: result,
    });
});
const getSingleFeature = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await features_service_1.FeaturesServices.getSingleFeatureFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Feature retrieved successfully',
        data: result,
    });
});
const updateFeature = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await features_service_1.FeaturesServices.updateFeatureIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Feature updated successfully',
        data: result,
    });
});
const deleteFeature = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await features_service_1.FeaturesServices.deleteFeatureFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Feature deleted successfully',
    });
});
exports.FeaturesControllers = {
    createFeature,
    getAllFeatures,
    getSingleFeature,
    updateFeature,
    deleteFeature,
};
//# sourceMappingURL=features.controller.js.map