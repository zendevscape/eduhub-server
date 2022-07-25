import moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { PasswordService } from '../../../common/services';
import { Admin, Guardian, Role, Seller, Student, User } from '../../user/entities';
import { Token, TokenType } from '../entities';
import {
  AccessTokenRes,
  CreateAccessTokenReq,
  DeleteRefreshTokenBodyReq,
  UpdateAccessTokenBodyReq,
  UserRes,
  ValidateUserReq,
} from '../dtos';

@Injectable()
export class AuthService {
  public constructor(
    private readonly configService: ConfigService,

    private readonly passwordService: PasswordService,

    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(credential: ValidateUserReq): Promise<UserRes | undefined> {
    let user: User | undefined;

    switch (credential.role) {
      case Role.Admin: {
        user = await this.adminsRepository.findOne(
          { email: credential.email },
          { select: ['id', 'password'] },
        );
        break;
      }
      case Role.Guardian: {
        user = await this.guardiansRepository.findOne(
          { email: credential.email },
          { select: ['id', 'password'] },
        );
        break;
      }
      case Role.Seller: {
        user = await this.sellersRepository.findOne(
          { email: credential.email },
          { select: ['id', 'password'] },
        );
        break;
      }
      case Role.Student: {
        user = await this.studentsRepository.findOne(
          { email: credential.email },
          { select: ['id', 'password'] },
        );
        break;
      }
    }

    if (user && (await this.passwordService.verify(credential.password, user.password))) {
      return user;
    } else {
      return undefined;
    }
  }

  public async createAccessToken(user: CreateAccessTokenReq): Promise<AccessTokenRes> {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      exp: moment()
        .add(this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION'), 'hours')
        .unix(),
      type: TokenType.Access,
      role: user.role,
    });

    const refreshTokenId = uuidv4();
    const refreshToken = this.jwtService.sign({
      sub: user.id,
      exp: moment()
        .add(this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION'), 'days')
        .unix(),
      type: TokenType.Refresh,
      jti: refreshTokenId,
    });

    await this.tokensRepository.save({
      id: refreshTokenId,
      user: { id: user.id },
      token: refreshToken,
      type: TokenType.Refresh,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async updateAccessToken(credential: UpdateAccessTokenBodyReq): Promise<AccessTokenRes> {
    const payload = this.jwtService.verify(credential.refreshToken);
    const token = await this.tokensRepository.findOne(payload.jti, { relations: ['user'] });

    if (!token || credential.refreshToken !== token.token) {
      throw new UnauthorizedException({
        success: false,
        message: 'User credentials invalid.',
      });
    } else {
      const accessToken = this.jwtService.sign({
        sub: token.user.id,
        exp: moment()
          .add(this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION'), 'hours')
          .unix(),
        type: TokenType.Access,
        role: token.user.role,
      });

      const refreshTokenId = uuidv4();
      const refreshToken = this.jwtService.sign({
        sub: token.user.id,
        exp: moment()
          .add(this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION'), 'days')
          .unix(),
        type: TokenType.Refresh,
        jti: refreshTokenId,
      });

      await this.tokensRepository.save({
        id: refreshTokenId,
        user: { id: token.user.id },
        token: refreshToken,
        type: TokenType.Refresh,
      });

      await this.tokensRepository.remove(token);

      return {
        accessToken,
        refreshToken,
      };
    }
  }

  public async deleteRefreshToken(credential: DeleteRefreshTokenBodyReq): Promise<void> {
    const payload = this.jwtService.verify(credential.refreshToken);

    await this.tokensRepository.remove(
      await this.tokensRepository.findOneOrFail(payload.jti, { relations: ['user'] }),
    );
  }
}
