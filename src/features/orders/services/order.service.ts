import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { Order } from '../entities';

@Service()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {}
}
