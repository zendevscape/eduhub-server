import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { AnySchema } from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  public constructor(private readonly schema: AnySchema) {}

  public transform(value: unknown): unknown {
    const { error } = this.schema.validate(value, { abortEarly: false });

    if (error) {
      throw new BadRequestException({
        success: false,
        message: 'Validation failed.',
        data: error.details.map((errorItem) => {
          return {
            keys: errorItem.path.join('.'),
            message: errorItem.message + '.',
          };
        }),
      });
    } else {
      return value;
    }
  }
}
