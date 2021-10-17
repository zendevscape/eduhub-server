import Joi from 'joi';

export const createAdminsSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(
          new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?& ]{8,}$'),
        ),
      }),
    )
    .max(50)
    .single(),
};

export const createGuardiansSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(
          new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?& ]{8,}$'),
        ),
      }),
    )
    .max(50)
    .single(),
};

export const createSellersSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(
          new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?& ]{8,}$'),
        ),
      }),
    )
    .max(50)
    .single(),
};

export const createStudentsSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(
          new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?& ]{8,}$'),
        ),
        guardianId: Joi.string().uuid().required(),
      }),
    )
    .max(50)
    .single(),
};

export const readUserSchema = {
  params: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
};

export const updateAdminSchema = {
  params: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
  }),
};

export const updateGuardianSchema = {
  params: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
  }),
};

export const updateSellerSchema = {
  params: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
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

export const updateSellersSchema = {
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

export const deleteUserSchema = {
  params: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
};

export const deleteUsersSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        id: Joi.string().uuid().required(),
      }),
    )
    .max(50)
    .single(),
};
