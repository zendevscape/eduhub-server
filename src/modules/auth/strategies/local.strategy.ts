import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { UserRes } from '../dto';
import { AuthService } from '../services';
import { validateUserSchema } from '../validations';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  public constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  public async validate(request: Request): Promise<UserRes> {
    const { value, error } = validateUserSchema.body.validate(request.body, { abortEarly: false });
    let user: UserRes | undefined;

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
      user = await this.authService.validateUser(value);
    }

    if (!user) {
      throw new UnauthorizedException({
        success: false,
        message: 'User credentials invalid.',
      });
    } else {
      return {
        id: user.id,
        role: user.role,
      };
    }
  }
}
