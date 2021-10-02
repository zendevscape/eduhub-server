import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { TransactionService } from '../services';

@JsonController('/transactions')
@Service()
export class TransactionController {
  constructor(private readonly TransactionService: TransactionService) {}

  @Get('/')
  getTransactions() {
    return;
  }

  // TODO: add more endpoint.
}
