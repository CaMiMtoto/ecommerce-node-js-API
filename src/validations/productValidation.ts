import Joi from "joi";

export const validateProduct = Joi.object({
    name: Joi.string().min(2).required().messages({
        'string.min': 'Name should have at least 2 characters',
        'any.required': 'Name is required',
    }),
    price: Joi.number().required().messages({
        'any.required': 'Price is required',
    }),
    description: Joi.string().optional(),
    category: Joi.string().required().messages({
        'any.required': 'Category is required',
    }),
    imageUrl: Joi.string().required().uri().messages({
        'any.required': 'Image is required',
        'uri.base': 'Invalid image URL',
    }),
    variants: Joi.array().optional().items({
        options: Joi.array().optional().items({
            name: Joi.string().required().messages({
                'any.required': 'Variant name is required',
            }),
            value: Joi.string().required().messages({
                'any.required': 'Variant name is required',
            }),
        }),
        price: Joi.number().required().messages({
            'any.required': 'Variant price is required',
        }),
        stock: Joi.number().optional()
    }),
    tags: Joi.array().optional(),
    stock: Joi.number().optional(),
});