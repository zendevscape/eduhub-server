import Joi from 'joi';

export const readTransactionSchema = {
  params: Joi.object().keys({
    guardianId: Joi.string().uuid(),
    sellerId: Joi.string().uuid(),
    studentId: Joi.string().uuid(),
    transactionId: Joi.string().uuid().required(),
  }),
};

export const readTransactionsSchema = {
  params: Joi.object().keys({
    guardianId: Joi.string().uuid(),
    sellerId: Joi.string().uuid(),
    studentId: Joi.string().uuid(),
  }),
};
