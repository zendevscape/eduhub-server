import { Body, Delete, JsonController, Post, Put, UseBefore } from 'routing-controllers';
import { celebrate, Modes } from 'celebrate';
import { Inject, Service } from 'typedi';
import { Response } from '../../../core/types';
import { AuthService } from '../services';
import {
  AccessTokenRes,
  CreateAccessTokenBodyReq,
  DeleteRefreshTokenBodyReq,
  UpdateAccessTokenBodyReq,
} from '../types';
import {
  createAccessTokenSchema,
  deleteRefreshTokenSchema,
  updateAccessTokenSchema,
} from '../validations';

@Service()
@JsonController('/auth')
export class AuthController {
  public constructor(
    @Inject()
    private readonly authService: AuthService,
  ) {}

  @Post('/')
  @UseBefore(celebrate(createAccessTokenSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async createAccessToken(
    @Body()
    body: CreateAccessTokenBodyReq,
  ): Promise<Response<AccessTokenRes>> {
    const result = await this.authService.createAccessToken(body);

    return {
      success: true,
      message: 'User authenticated.',
      data: result,
    };
  }

  @Put('/')
  @UseBefore(celebrate(updateAccessTokenSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async updateAccessToken(
    @Body()
    body: UpdateAccessTokenBodyReq,
  ): Promise<Response<AccessTokenRes>> {
    const result = await this.authService.updateAccessToken(body);

    return {
      success: true,
      message: 'User authentication refreshed.',
      data: result,
    };
  }

  @Delete('/')
  @UseBefore(celebrate(deleteRefreshTokenSchema, { abortEarly: false }, { mode: Modes.FULL }))
  public async deleteRefreshToken(
    @Body()
    body: DeleteRefreshTokenBodyReq,
  ): Promise<Response<void>> {
    await this.authService.deleteRefreshToken(body);

    return {
      success: true,
      message: 'Authentication revoked.',
    };
  }
}
