import { JsonController } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { AuthService } from '../services';

@Service()
@JsonController('/auth')
export class AuthController {
  public constructor(
    @Inject()
    private readonly authService: AuthService,
  ) {}

  // TODO: add routes handler.
}
