import { Controller } from '@nestjs/common';
import { TransactionsService } from '../services';

@Controller('transactions')
export class TransactionsController {
  public constructor(private readonly transactionsService: TransactionsService) {}

  // TODO: add more endpoint.
}
