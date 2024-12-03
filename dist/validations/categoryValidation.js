"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateCategory = joi_1.default.object({
    name: joi_1.default.string().min(2).required().messages({
        'string.min': 'Name should have at least 2 characters',
        'any.required': 'Name is required',
    }),
    description: joi_1.default.string().optional()
});
