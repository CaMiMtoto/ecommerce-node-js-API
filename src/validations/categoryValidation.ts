import Joi from "joi";

export const validateCategory = Joi.object({
    name: Joi.string().min(2).required().messages({
        'string.min': 'Name should have at least 2 characters',
        'any.required': 'Name is required',
    }),
    description: Joi.string().optional()
});

