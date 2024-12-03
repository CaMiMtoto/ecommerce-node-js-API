import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().min(2).required().messages({
        'string.min': 'Name should have at least 2 characters',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).max(20).required().messages({
        'string.min': 'Password should have at least 6 characters',
        'string.max': 'Password should not exceed 20 characters',
        'any.required': 'Password is required',
    }),
    confirmPassword: Joi.string().min(6).max(20).required().messages({
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
