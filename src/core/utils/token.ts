import jwt from 'jsonwebtoken';
import config from '../config';
import { TokenType } from '../../features/auth';
import { Role } from '../../features/users';
import moment from 'moment';

export const signToken = (
  sub: string,
  exp: number,
  type: TokenType,
  roles?: Role,
  jti?: string,
  secret: string = config.jwt.secret,
): string => {
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
};

export const verifyToken = (token: string, secret: string = config.jwt.secret): jwt.JwtPayload => {
  return jwt.verify(token, secret) as jwt.JwtPayload;
};
