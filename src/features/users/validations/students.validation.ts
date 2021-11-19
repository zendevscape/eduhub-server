import Joi from 'joi';

export const createStudentsSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?& ]{8,}$'))
          .required(),
        guardianId: Joi.string().uuid().required(),
      }),
    )
    .max(50)
    .single(),
};

export const readStudentSchema = {
  params: Joi.object().keys({
    studentId: Joi.string().uuid().required(),
  }),
};

export const updateStudentSchema = {
  params: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    guardianId: Joi.string().uuid(),
  }),
};

export const updateStudentsSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        id: Joi.string().uuid().required(),
        name: Joi.string(),
        email: Joi.string().email(),
        guardianId: Joi.string().uuid(),
      }),
    )
    .max(50)
    .single(),
};

export const deleteStudentSchema = {
  params: Joi.object().keys({
    studentId: Joi.string().uuid().required(),
  }),
};

export const deleteStudentsSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        id: Joi.string().uuid().required(),
      }),
    )
    .max(50)
    .single(),
};
