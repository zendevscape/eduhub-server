import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { Product } from '../entities';
import { ProductValidator } from '../validation';
import { InvariantError } from '../../../core/exception/InvariantError';

@Service()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  async createProduct(payload: Product): Promise<string | undefined> {
    ProductValidator.validatePostProductPayloadSchema(payload);

    const product = this.productRepository.create(payload);
    const result = await this.productRepository.save(product);

    if (!result) {
      throw new InvariantError('Product failed to add');
    }

    return result.id;
  }

  async getProducts(): Promise<Array<Product>> {
    const result = await this.productRepository.find();

    return result;
  }
}
