import Joi from 'joi';

export const createPaymentSchema = {
  body: Joi.object().keys({
    channelCategory: Joi.string().valid('virtual_account').required(),
    channelCode: Joi.string().valid('bca', 'bni', 'bri', 'mandiri').required(),
    amount: Joi.number().min(1000).max(20000000).required(),
  }),
  params: Joi.object().keys({
    guardianId: Joi.string().uuid(),
    sellerId: Joi.string().uuid(),
    studentId: Joi.string().uuid(),
  }),
};

export const createTransferSchema = {
  body: Joi.object().keys({
    destinationUserId: Joi.string().uuid().required(),
    amount: Joi.number().min(1000).max(20000000).required(),
  }),
  params: Joi.object().keys({
    guardianId: Joi.string().uuid(),
    sellerId: Joi.string().uuid(),
    studentId: Joi.string().uuid(),
  }),
};

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
