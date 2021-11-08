import Joi from 'joi';

export const createProductsSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid().required(),
  }),
  body: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
      }),
    )
    .max(50)
    .single(),
};

export const readProductSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid().required(),
    productId: Joi.string().uuid().required(),
  }),
};

export const readProductsSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid().required(),
  }),
};

export const updateProductSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid().required(),
    productId: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    stock: Joi.number(),
  }),
};

export const updateProductsSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid().required(),
  }),
  body: Joi.array()
    .items(
      Joi.object().keys({
        id: Joi.string().uuid().required(),
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        stock: Joi.number(),
      }),
    )
    .max(50)
    .single(),
};

export const deleteProductSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid().required(),
    productId: Joi.string().uuid().required(),
  }),
};

export const deleteProductsSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid().required(),
  }),
  body: Joi.array()
    .items(
      Joi.object().keys({
        id: Joi.string().uuid().required(),
      }),
    )
    .max(50)
    .single(),
};
