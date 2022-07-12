import Joi from 'joi';

export const createOrdersSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        sellerId: Joi.string().uuid(),
        buyerId: Joi.string().uuid().required(),
        orderItems: Joi.array()
          .items(
            Joi.object().keys({
              productId: Joi.string().uuid().required(),
              quantity: Joi.number().required(),
            }),
          )
          .required(),
      }),
    )
    .max(50)
    .single(),
  params: Joi.object().keys({
    sellerId: Joi.string().uuid(),
  }),
};

export const readOrderSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid(),
    studentId: Joi.string().uuid(),
    orderId: Joi.string().uuid().required(),
  }),
};

export const readOrdersSchema = {
  params: Joi.object().keys({
    sellerId: Joi.string().uuid(),
    studentId: Joi.string().uuid(),
  }),
};
