"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pricing = void 0;
const mongoose_1 = require("mongoose");
const pricingSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    icon: { type: String, required: true },
    features: [{ type: String, required: true }],
}, { timestamps: true });
exports.Pricing = (0, mongoose_1.model)('Pricing', pricingSchema);
//# sourceMappingURL=pricing.model.js.map