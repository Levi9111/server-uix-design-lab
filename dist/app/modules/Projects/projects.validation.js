"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectValidations = void 0;
const zod_1 = require("zod");
const createProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        project: zod_1.z.object({
            title: zod_1.z
                .string()
                .trim()
                .min(1, 'Title is required')
                .max(100, 'Title cannot be more than 100 characters'),
            description: zod_1.z.string().trim().min(1, 'Description is required'),
            projectImageUrl: zod_1.z
                .string()
                .url('Project image URL must be a valid URL')
                .optional()
                .or(zod_1.z.literal('')),
        }),
    }),
});
const updateProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .trim()
            .min(1, 'Title is required')
            .max(100, 'Title cannot be more than 100 characters')
            .optional(),
        description: zod_1.z.string().trim().min(1, 'Description is required').optional(),
        projectImageUrl: zod_1.z
            .string()
            .url('Project image URL must be a valid URL')
            .optional(),
    }),
});
exports.ProjectValidations = {
    createProjectValidationSchema,
    updateProjectValidationSchema,
};
//# sourceMappingURL=projects.validation.js.map