import Joi from 'joi';

export const PostProductPayloadSchema = Joi.alternatives().try(
  Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
  }),
  Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
    }),
  ),
);

export const ProductIdParamSchema = Joi.string().guid().required();

export const UpdateProductPayloadSchema = Joi.object().keys({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  stock: Joi.number(),
});

export const DeleteProductsPayloadSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().guid().required(),
  }),
);
