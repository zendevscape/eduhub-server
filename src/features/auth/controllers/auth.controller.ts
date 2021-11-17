import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { Response } from '../../../core/dtos';
import { ValidationPipe } from '../../../core/pipes';
import { AuthService } from '../services';
import {
  AccessTokenRes,
  CreateAccessTokenBodyReq,
  DeleteRefreshTokenBodyReq,
  UpdateAccessTokenBodyReq,
} from '../dtos';
import {
  createAccessTokenSchema,
  deleteRefreshTokenSchema,
  updateAccessTokenSchema,
} from '../validations';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post()
  public async createAccessToken(
    @Body(new ValidationPipe(createAccessTokenSchema.body))
    body: CreateAccessTokenBodyReq,
  ): Promise<Response<AccessTokenRes>> {
    const result = await this.authService.createAccessToken(body);

    return {
      success: true,
      message: 'User authenticated.',
      data: result,
    };
  }

  @Put()
  public async updateAccessToken(
    @Body(new ValidationPipe(updateAccessTokenSchema.body))
    body: UpdateAccessTokenBodyReq,
  ): Promise<Response<AccessTokenRes>> {
    const result = await this.authService.updateAccessToken(body);

    return {
      success: true,
      message: 'User authentication refreshed.',
      data: result,
    };
  }

  @Delete()
  public async deleteRefreshToken(
    @Body(new ValidationPipe(deleteRefreshTokenSchema.body))
    body: DeleteRefreshTokenBodyReq,
  ): Promise<Response<void>> {
    await this.authService.deleteRefreshToken(body);

    return {
      success: true,
      message: 'Authentication revoked.',
    };
  }
}
