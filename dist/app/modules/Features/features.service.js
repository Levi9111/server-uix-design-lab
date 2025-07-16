"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const features_model_1 = require("./features.model");
const createFeatureIntoDB = async (payload) => {
    const result = await features_model_1.Feature.create(payload);
    return result;
};
const updateFeatureIntoDB = async (id, payload) => {
    const feature = await features_model_1.Feature.findById(id);
    if (!feature) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Feature Not Found');
    }
    for (const [key, value] of Object.entries(payload)) {
        feature[key] = value;
    }
    const result = await feature.save();
    return result;
};
const getAllFeaturesFromDB = async () => {
    const result = await features_model_1.Feature.find();
    return result;
};
const getSingleFeatureFromDB = async (id) => {
    const result = await features_model_1.Feature.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Feature Not Found');
    }
    return result;
};
const deleteFeatureFromDB = async (id) => {
    const deleted = await features_model_1.Feature.findByIdAndDelete(id);
    if (!deleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Feature!');
    }
    return deleted;
};
exports.FeaturesServices = {
    createFeatureIntoDB,
    updateFeatureIntoDB,
    getAllFeaturesFromDB,
    getSingleFeatureFromDB,
    deleteFeatureFromDB,
};
//# sourceMappingURL=features.service.js.map