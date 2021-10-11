import Joi from 'joi';

export const CreateProductsSchema = {
  body: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
      }),
    )
    .single(),
};

export const ReadProductByIdSchema = {
  params: Joi.object({
    id: Joi.string().guid().required(),
  }),
};

export const UpdateProductsSchema = {
  body: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().guid().required(),
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        stock: Joi.number(),
      }),
    )
    .single(),
};

export const UpdateProductByIdSchema = {
  params: Joi.object({
    id: Joi.string().guid().required(),
  }),
  body: Joi.array()
    .items(
      Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        stock: Joi.number(),
      }),
    )
    .single(),
};

export const DeleteProductsSchema = {
  body: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
      }),
    )
    .single(),
};

export const DeleteProductByIdSchema = {
  params: Joi.object({
    id: Joi.string().guid().required(),
  }),
};
