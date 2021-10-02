import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { User } from '../entities';

@Service()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
}
