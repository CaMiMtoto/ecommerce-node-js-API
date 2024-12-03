"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateProduct = joi_1.default.object({
    name: joi_1.default.string().min(2).required().messages({
        'string.min': 'Name should have at least 2 characters',
        'any.required': 'Name is required',
    }),
    price: joi_1.default.number().required().messages({
        'any.required': 'Price is required',
    }),
    description: joi_1.default.string().optional(),
    category: joi_1.default.string().required().messages({
        'any.required': 'Category is required',
    }),
    imageUrl: joi_1.default.string().required().uri().messages({
        'any.required': 'Image is required',
        'uri.base': 'Invalid image URL',
    }),
    variants: joi_1.default.array().optional().items({
        options: joi_1.default.array().optional().items({
            name: joi_1.default.string().required().messages({
                'any.required': 'Variant name is required',
            }),
            value: joi_1.default.string().required().messages({
                'any.required': 'Variant name is required',
            }),
        }),
        price: joi_1.default.number().required().messages({
            'any.required': 'Variant price is required',
        }),
        stock: joi_1.default.number().optional()
    }),
    tags: joi_1.default.array().optional(),
    stock: joi_1.default.number().optional(),
});
