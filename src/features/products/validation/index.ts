import { InvariantError } from '../../../core/exception/InvariantError';
import { PostProductPayloadSchema } from './schema';

export const ProductValidator = {
  validatePostProductPayloadSchema: (payload: any) => {
    const validationResult = PostProductPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
