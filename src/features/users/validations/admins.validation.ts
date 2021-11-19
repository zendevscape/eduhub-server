import Joi from 'joi';

export const createAdminsSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?& ]{8,}$'))
          .required(),
      }),
    )
    .max(50)
    .single(),
};

export const readAdminSchema = {
  params: Joi.object().keys({
    adminId: Joi.string().uuid().required(),
  }),
};

export const updateAdminSchema = {
  params: Joi.object().keys({
    adminId: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
  }),
};

export const updateAdminsSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        id: Joi.string().uuid().required(),
        name: Joi.string(),
        email: Joi.string().email(),
      }),
    )
    .max(50)
    .single(),
};

export const deleteAdminSchema = {
  params: Joi.object().keys({
    adminId: Joi.string().uuid().required(),
  }),
};

export const deleteAdminsSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        id: Joi.string().uuid().required(),
      }),
    )
    .max(50)
    .single(),
};
