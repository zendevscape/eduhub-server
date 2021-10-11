import { InvariantError } from '../../../core/exception/InvariantError';
import {
  DeleteProductsPayloadSchema,
  PostProductPayloadSchema,
  ProductIdParamSchema,
  UpdateProductPayloadSchema,
} from './schema';

export const ProductValidator = {
  validatePostProductPayloadSchema: (payload: any) => {
    const validationResult = PostProductPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateUpdateProductPayloadSchema: (payload: any) => {
    const validationResult = UpdateProductPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateDeleteProductsPayloadSchema: (payload: any) => {
    const validationResult = DeleteProductsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateProductIdParamSchema: (param: any) => {
    const validationResult = ProductIdParamSchema.validate(param);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
