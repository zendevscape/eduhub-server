import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { User } from '../../users/entities/user';

@Service()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
}
