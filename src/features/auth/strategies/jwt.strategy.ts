import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRes } from '../dtos';
import { TokenType } from '../entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor(public readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async validate(payload: any): Promise<UserRes> {
    if (payload.type !== TokenType.Access) {
      throw new UnauthorizedException({
        success: false,
        message: 'User credentials invalid.',
      });
    } else {
      return {
        id: payload.sub,
        role: payload.role,
      };
    }
  }
}
