import Joi from 'joi';

export const createAccessTokenSchema = {
  body: Joi.object().keys({
    role: Joi.string().valid('admin', 'guardian', 'seller', 'student').required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const updateAccessTokenSchema = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const deleteRefreshTokenSchema = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
