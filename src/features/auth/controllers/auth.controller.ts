import { JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { AuthService } from '../services';

@JsonController('/auth')
@Service()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public signup() {
    return;
  }

  @Post('/signin')
  public signin() {
    return;
  }

  @Post('/signout')
  public signout() {
    return;
  }

  @Post('/refresh-token')
  public refreshToken() {
    return;
  }

  @Post('/forgot-password')
  public forgotPassword() {
    return;
  }

  @Post('/reset-password')
  public resetPassword() {
    return;
  }

  @Post('/send-verification-email')
  public sendVerificationEmail() {
    return;
  }

  @Post('/verify-email')
  public verifyEmail() {
    return;
  }
}
