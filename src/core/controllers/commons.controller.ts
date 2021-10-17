import { All, HttpCode, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from '../types';

@Service()
@JsonController()
export class CommonsController {
  @All('*')
  @HttpCode(404)
  public unknown(): Response<undefined> {
    return {
      success: false,
      message: 'Route or method undefined.',
    };
  }
}
