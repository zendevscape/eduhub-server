import moment from 'moment';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TokenType } from '../../features/auth/entities';
import { Role } from '../../features/users/entities';

@Injectable()
export class TokenService {
  public constructor(private readonly configService: ConfigService) {}

  public sign(
    sub: string,
    exp: number,
    type: TokenType,
    roles?: Role,
    jti?: string,
    secret: string = this.configService.get('JWT_SECRET') as string,
  ): string {
    return jwt.sign(
      {
        jti,
        sub,
        iat: moment().unix(),
        exp,
        type,
        roles,
      },
      secret,
    );
  }

  public verify(
    token: string,
    secret: string = this.configService.get('JWT_SECRET') as string,
  ): jwt.JwtPayload {
    return jwt.verify(token, secret) as jwt.JwtPayload;
  }
}
