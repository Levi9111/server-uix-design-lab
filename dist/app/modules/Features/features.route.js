"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesRoute = void 0;
const express_1 = require("express");
const features_controller_1 = require("./features.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const features_validation_1 = require("./features.validation");
const router = (0, express_1.Router)();
router.get('/', features_controller_1.FeaturesControllers.getAllFeatures);
router.get('/:id', features_controller_1.FeaturesControllers.getSingleFeature);
router.post('/', (0, validateRequest_1.default)(features_validation_1.FeaturesValidations.createFeatureZodSchema), features_controller_1.FeaturesControllers.createFeature);
router.patch('/update-feature/:id', (0, validateRequest_1.default)(features_validation_1.FeaturesValidations.updateFeatureZodSchema), features_controller_1.FeaturesControllers.updateFeature);
router.delete('/delete-feature/:id', features_controller_1.FeaturesControllers.deleteFeature);
exports.FeaturesRoute = router;
//# sourceMappingURL=features.route.js.map