"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingValidations = void 0;
const zod_1 = require("zod");
const createPricingPlanSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        price: zod_1.z.number(),
        icon: zod_1.z.enum(['Monitor', 'Rocket', 'ShieldCheck']),
        features: zod_1.z
            .array(zod_1.z.string().min(1, 'Feature cannot be empty'))
            .min(1, 'At least one feature is required'),
    }),
});
const updatePricingPlanSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').optional(),
    price: zod_1.z.number().optional(),
    icon: zod_1.z.enum(['Monitor', 'Rocket', 'ShieldCheck']).optional(),
    features: zod_1.z
        .array(zod_1.z.string().min(1, 'Feature cannot be empty'))
        .min(1, 'At least one feature is required')
        .optional(),
});
exports.PricingValidations = {
    createPricingPlanSchema,
    updatePricingPlanSchema,
};
//# sourceMappingURL=pricing.validation.js.map