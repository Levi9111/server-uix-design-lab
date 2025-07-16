"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQ = void 0;
const mongoose_1 = require("mongoose");
const faqsShhema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.FAQ = (0, mongoose_1.model)('FAQ', faqsShhema);
//# sourceMappingURL=faqs.model.js.map