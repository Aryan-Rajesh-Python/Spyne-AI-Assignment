const Joi = require('joi');
const constants = require('./../util/util.constant')

const userRegisterSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp(constants.password_regex))
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.',
        }),
});

const validateRegisterUser = (data) => {
    const { error, value } = userRegisterSchema.validate(data);
    return { error, value };
};



const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp(constants.password_regex))
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.',
        }),
});

const validateLoginUser = (data) => {
    const { error, value } = userLoginSchema.validate(data);
    return { error, value };
};



module.exports = { validateRegisterUser, validateLoginUser };