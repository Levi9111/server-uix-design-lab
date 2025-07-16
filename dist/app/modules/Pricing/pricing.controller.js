"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingControllers = void 0;
const catchAsync_1 = require("./../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("./../..//utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pricing_service_1 = require("./pricing.service");
const createPricing = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await pricing_service_1.PricingServices.createPricingIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Pricing Plan created successfully',
        data: result,
    });
});
const getAllPricing = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const result = await pricing_service_1.PricingServices.getAllPricingFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Pricing Plans retrieved successfully',
        data: result,
    });
});
const getSinglePricing = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await pricing_service_1.PricingServices.getSinglePricingFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Pricing Plan retrieved successfully',
        data: result,
    });
});
const updatePricing = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await pricing_service_1.PricingServices.updatePricingIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Pricing Plan updated successfully',
        data: result,
    });
});
const deletePricing = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await pricing_service_1.PricingServices.deletePricingFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Pricing Plan deleted successfully',
    });
});
exports.PricingControllers = {
    createPricing,
    getAllPricing,
    getSinglePricing,
    updatePricing,
    deletePricing,
};
//# sourceMappingURL=pricing.controller.js.map