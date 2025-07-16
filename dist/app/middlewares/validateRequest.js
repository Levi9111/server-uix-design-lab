"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = require("../utils/catchAsync");
const validateRequest = (schema) => {
    return (0, catchAsync_1.catchAsync)(async (req, _res, next) => {
        await schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });
        return next();
    });
};
exports.default = validateRequest;
//# sourceMappingURL=validateRequest.js.map