"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendEmail = async (to, subject, text, html) => {
    const transporter = nodemailer_1.default.createTransport({
        host: 'stmp.gmail.com',
        port: 587,
        secure: config_1.default.NODE_ENV === 'production',
        auth: {
            user: config_1.default.super_admin_email,
            pass: config_1.default.super_admin_email_pass,
        },
    });
    await transporter.sendMail({
        from: config_1.default.super_admin_email,
        to,
        subject,
        text,
        html,
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map