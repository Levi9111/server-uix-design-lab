"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingRoute = void 0;
const express_1 = require("express");
const pricing_controller_1 = require("./pricing.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const pricing_validation_1 = require("./pricing.validation");
const router = (0, express_1.Router)();
router.get('/', pricing_controller_1.PricingControllers.getAllPricing);
router.get('/:id', pricing_controller_1.PricingControllers.getSinglePricing);
router.post('/', (0, validateRequest_1.default)(pricing_validation_1.PricingValidations.createPricingPlanSchema), pricing_controller_1.PricingControllers.createPricing);
router.patch('/update-plan/:id', (0, validateRequest_1.default)(pricing_validation_1.PricingValidations.updatePricingPlanSchema), pricing_controller_1.PricingControllers.updatePricing);
router.delete('/delete-plan/:id', pricing_controller_1.PricingControllers.deletePricing);
exports.PricingRoute = router;
//# sourceMappingURL=pricing.route.js.map