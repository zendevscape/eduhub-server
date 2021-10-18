import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import config from '../../../core/config';
import { Token, TokenType } from '../entities';
import { Admin, Guardian, Role, Seller, Student, User } from '../../users';
import {
  AccessTokenRes,
  CreateAccessTokenBodyReq,
  DeleteRefreshTokenBodyReq,
  UpdateAccessTokenBodyReq,
} from '../types';
import { NotFoundError, UnauthorizedError } from '../../../core/errors';
import { verifyPassword } from '../../../core/utils/password';
import { signToken, verifyToken } from '../../../core/utils/token';

@Service()
export class AuthService {
  public constructor(
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
        throw new NotFoundError('User role invalid.');
    }

    if (user && (await verifyPassword(credential.password, user.password))) {
      const accessToken = signToken(
        user.id,
        moment().add(config.jwt.accessTokenExpiration, 'hours').unix(),
        TokenType.Access,
        credential.role,
      );
      const refreshTokenId = uuidv4();
      const refreshToken = signToken(
        user.id,
        moment().add(config.jwt.refreshTokenExpiration, 'days').unix(),
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
      throw new UnauthorizedError('User credentials invalid.');
    }
  }

  public async updateAccessToken(credential: UpdateAccessTokenBodyReq): Promise<AccessTokenRes> {
    const payload = verifyToken(credential.refreshToken);
    const token = await this.tokensRepository.findOne({ id: payload.jti }, { relations: ['user'] });

    if (token && credential.refreshToken === token.token) {
      const accessToken = signToken(
        token.user.id,
        moment().add(config.jwt.accessTokenExpiration, 'hours').unix(),
        TokenType.Access,
        token.user.role,
      );
      const refreshTokenId = uuidv4();
      const refreshToken = signToken(
        token.user.id,
        moment().add(config.jwt.refreshTokenExpiration, 'days').unix(),
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
      throw new UnauthorizedError('User credentials invalid.');
    }
  }

  public async deleteRefreshToken(credential: DeleteRefreshTokenBodyReq): Promise<void> {
    const payload = verifyToken(credential.refreshToken);
    await this.tokensRepository.remove(
      await this.tokensRepository.findOneOrFail({ id: payload.jti }, { relations: ['user'] }),
    );
  }
}
