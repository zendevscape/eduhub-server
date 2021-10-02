import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { UserService } from '../services';

@JsonController('/users')
@Service()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getUsers() {
    return;
  }

  @Get('/:id')
  getUser() {
    return;
  }

  // TODO: add more endpoint.
}
