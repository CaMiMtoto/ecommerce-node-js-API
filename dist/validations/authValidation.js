"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).required().messages({
        'string.min': 'Name should have at least 2 characters',
        'any.required': 'Name is required',
    }),
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Invalid email address',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string().min(6).max(20).required().messages({
        'string.min': 'Password should have at least 6 characters',
        'string.max': 'Password should not exceed 20 characters',
        'any.required': 'Password is required',
    }),
    confirmPassword: joi_1.default.string().min(6).max(20).required().messages({
        'string.min': 'Password confirmation should have at least 6 characters',
        'string.max': 'Password confirmation should not exceed 20 characters',
        'any.required': 'Password confirmation is required',
    }),
}).custom((value, helpers) => {
    if (value.password !== value.confirmPassword) {
        return helpers.error('password.match', { message: 'Passwords do not match' });
    }
    return value;
});
