import Joi from 'joi';

export const createSellersSchema = {
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

export const readSellerSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid().required(),
  }),
};

export const updateSellerSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
  }),
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

export const deleteSellerSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid().required(),
  }),
};

export const deleteSellersSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        id: Joi.string().uuid().required(),
      }),
    )
    .max(50)
    .single(),
};
