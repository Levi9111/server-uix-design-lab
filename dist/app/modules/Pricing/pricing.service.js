"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const pricing_model_1 = require("./pricing.model");
const createPricingIntoDB = async (payload) => {
    const result = await pricing_model_1.Pricing.create(payload);
    return result;
};
const updatePricingIntoDB = async (id, payload) => {
    const pricing = await pricing_model_1.Pricing.findById(id);
    if (!pricing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Pricing Plan Not Found');
    }
    for (const [key, value] of Object.entries(payload)) {
        pricing[key] = value;
    }
    const result = await pricing.save();
    return result;
};
const getAllPricingFromDB = async () => {
    const result = await pricing_model_1.Pricing.find();
    return result;
};
const getSinglePricingFromDB = async (id) => {
    const result = await pricing_model_1.Pricing.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Pricing Plan Not Found');
    }
    return result;
};
const deletePricingFromDB = async (id) => {
    const deleted = await pricing_model_1.Pricing.findByIdAndDelete(id);
    if (!deleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Pricing Plan!');
    }
    return deleted;
};
exports.PricingServices = {
    createPricingIntoDB,
    updatePricingIntoDB,
    getAllPricingFromDB,
    getSinglePricingFromDB,
    deletePricingFromDB,
};
//# sourceMappingURL=pricing.service.js.map