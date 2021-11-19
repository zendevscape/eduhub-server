import Joi from 'joi';

export const createGuardiansSchema = {
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

export const readGuardianSchema = {
  params: Joi.object().keys({
    guardianId: Joi.string().uuid().required(),
  }),
};

export const updateGuardianSchema = {
  params: Joi.object().keys({
    guardianId: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
  }),
};

export const updateGuardiansSchema = {
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

export const deleteGuardianSchema = {
  params: Joi.object().keys({
    guardianId: Joi.string().uuid().required(),
  }),
};

export const deleteGuardiansSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        id: Joi.string().uuid().required(),
      }),
    )
    .max(50)
    .single(),
};
