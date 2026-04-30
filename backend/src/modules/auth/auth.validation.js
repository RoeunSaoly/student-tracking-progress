import Joi from "joi";

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("student", "teacher").required(),
    first_name: Joi.string().max(100),
    last_name: Joi.string().max(100),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

export const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    next();
};

export const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    next();
};

export const validateRefreshToken = (req, res, next) => {
    const { error } = refreshTokenSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    next();
};
