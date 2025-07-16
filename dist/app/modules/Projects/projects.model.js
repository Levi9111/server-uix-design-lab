"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects = void 0;
const mongoose_1 = require("mongoose");
const projectsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    projectImageUrl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Projects = (0, mongoose_1.model)('Projects', projectsSchema);
//# sourceMappingURL=projects.model.js.map