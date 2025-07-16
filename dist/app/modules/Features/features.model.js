"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = void 0;
const mongoose_1 = require("mongoose");
const featureSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
}, { timestamps: true });
exports.Feature = (0, mongoose_1.model)('Feature', featureSchema);
//# sourceMappingURL=features.model.js.map