import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { Response } from '../../../core/dtos';
import { User } from '../../../core/decorators';
import { ValidationPipe } from '../../../core/pipes';
import { LocalAuthGuard } from '../guards';
import { AuthService } from '../services';
import {
  AccessTokenRes,
  CreateAccessTokenReq,
  DeleteRefreshTokenBodyReq,
  UpdateAccessTokenBodyReq,
} from '../dtos';
import { deleteRefreshTokenSchema, updateAccessTokenSchema } from '../validations';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  public async createAccessToken(
    @User()
    user: CreateAccessTokenReq,
  ): Promise<Response<AccessTokenRes>> {
    const result = await this.authService.createAccessToken(user);

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
