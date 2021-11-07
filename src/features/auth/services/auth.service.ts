import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService, TokenService } from '../../../core';
import { Admin, Guardian, Role, Seller, Student, User } from '../../users';
import { Token, TokenType } from '../entities';
import {
  AccessTokenRes,
  CreateAccessTokenBodyReq,
  DeleteRefreshTokenBodyReq,
  UpdateAccessTokenBodyReq,
} from '../dtos';

@Injectable()
export class AuthService {
  public constructor(
    private readonly configService: ConfigService,

    private readonly passwordService: PasswordService,

    private readonly tokenService: TokenService,

    @InjectRepository(Token)
    private readonly tokensRepository: Repository<Token>,

    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,

    @InjectRepository(Guardian)
    private readonly guardiansRepository: Repository<Guardian>,

    @InjectRepository(Seller)
    private readonly sellersRepository: Repository<Seller>,

    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  public async createAccessToken(credential: CreateAccessTokenBodyReq): Promise<AccessTokenRes> {
    let user: User | undefined;
    switch (credential.role) {
      case Role.Admin:
        user = await this.adminsRepository.findOne(
          { email: credential.email },
          { select: ['id', 'password'] },
        );
        break;
      case Role.Guardian:
        user = await this.guardiansRepository.findOne(
          { email: credential.email },
          { select: ['id', 'password'] },
        );
        break;
      case Role.Seller:
        user = await this.sellersRepository.findOne(
          { email: credential.email },
          { select: ['id', 'password'] },
        );
        break;
      case Role.Student:
        user = await this.studentsRepository.findOne(
          { email: credential.email },
          { select: ['id', 'password'] },
        );
        break;
      default:
        throw new NotFoundException({
          success: false,
          message: 'User role invalid.',
        });
    }

    if (user && (await this.passwordService.verify(credential.password, user.password))) {
      const accessToken = this.tokenService.sign(
        user.id,
        moment().add(this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'), 'hours').unix(),
        TokenType.Access,
        credential.role,
      );
      const refreshTokenId = uuidv4();
      const refreshToken = this.tokenService.sign(
        user.id,
        moment().add(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'), 'days').unix(),
        TokenType.Refresh,
        undefined,
        refreshTokenId,
      );

      await this.tokensRepository.save(
        this.tokensRepository.create({
          id: refreshTokenId,
          user,
          token: refreshToken,
          type: TokenType.Refresh,
        }),
      );

      return {
        accessToken,
        refreshToken,
      };
    } else {
      throw new UnauthorizedException({
        success: false,
        message: 'User credentials invalid.',
      });
    }
  }

  public async updateAccessToken(credential: UpdateAccessTokenBodyReq): Promise<AccessTokenRes> {
    const payload = this.tokenService.verify(credential.refreshToken);
    const token = await this.tokensRepository.findOne({ id: payload.jti }, { relations: ['user'] });

    if (token && credential.refreshToken === token.token) {
      const accessToken = this.tokenService.sign(
        token.user.id,
        moment().add(this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'), 'hours').unix(),
        TokenType.Access,
        token.user.role,
      );
      const refreshTokenId = uuidv4();
      const refreshToken = this.tokenService.sign(
        token.user.id,
        moment().add(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'), 'days').unix(),
        TokenType.Refresh,
        undefined,
        refreshTokenId,
      );

      await this.tokensRepository.save(
        this.tokensRepository.create({
          id: refreshTokenId,
          user: token.user,
          token: refreshToken,
          type: TokenType.Refresh,
        }),
      );

      await this.tokensRepository.remove(token);

      return {
        accessToken,
        refreshToken,
      };
    } else {
      throw new UnauthorizedException({
        success: false,
        message: 'User credentials invalid.',
      });
    }
  }

  public async deleteRefreshToken(credential: DeleteRefreshTokenBodyReq): Promise<void> {
    const payload = this.tokenService.verify(credential.refreshToken);
    await this.tokensRepository.remove(
      await this.tokensRepository.findOneOrFail({ id: payload.jti }, { relations: ['user'] }),
    );
  }
}
