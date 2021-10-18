import { JsonController } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { TransactionsService } from '../services';

@Service()
@JsonController('/transactions')
export class TransactionsController {
  constructor(
    @Inject()
    private readonly transactionsService: TransactionsService,
  ) {}

  // TODO: add more endpoint.
}
