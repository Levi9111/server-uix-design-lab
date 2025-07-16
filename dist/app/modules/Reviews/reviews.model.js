"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reviews = void 0;
const mongoose_1 = require("mongoose");
const reveiwsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    roi: {
        type: String,
        required: true,
    },
    avatarInitials: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    stats: {
        type: Map,
        of: String,
        default: {},
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    },
}, { timestamps: true });
reveiwsSchema.pre('save', function (next) {
    if (!this.avatarInitials && this.name) {
        this.avatarInitials = this.name
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase())
            .join('');
    }
    next();
});
exports.Reviews = (0, mongoose_1.model)('Reviews', reveiwsSchema);
//# sourceMappingURL=reviews.model.js.map