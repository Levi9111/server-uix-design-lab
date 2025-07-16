"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidations = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.object({
            title: zod_1.z.string().trim().min(1, 'Title is required'),
            name: zod_1.z.string().trim().min(1, 'Name is required'),
            role: zod_1.z.string().trim().min(1, 'Role is required'),
            description: zod_1.z.string().trim().min(1, 'Description is required'),
            roi: zod_1.z.string().trim().min(1, 'ROI is required'),
            revenue: zod_1.z.string().trim().min(1, 'Revenue is required'),
            stats: zod_1.z
                .record(zod_1.z.string().min(1, 'Stat value cannot be empty'))
                .optional(),
        }),
    }),
});
const updateReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().trim().optional(),
        name: zod_1.z.string().trim().optional(),
        role: zod_1.z.string().trim().optional(),
        description: zod_1.z.string().trim().optional(),
        roi: zod_1.z.string().trim().optional(),
        revenue: zod_1.z.string().trim().optional(),
        stats: zod_1.z.record(zod_1.z.string()).optional(),
    }),
});
exports.ReviewValidations = {
    createReviewValidationSchema,
    updateReviewValidationSchema,
};
//# sourceMappingURL=reviews.validation.js.map