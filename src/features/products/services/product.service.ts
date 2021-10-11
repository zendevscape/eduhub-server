import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { Product } from '../entities';
import { InvariantError } from '../../../core/exception/InvariantError';
import { NotFoundError } from '../../../core/exception/NotFoundError';

@Service()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  async createProduct(payload: Record<string, unknown>): Promise<string | Array<string>> {
    const product = this.productRepository.create(payload);
    const result: any = await this.productRepository.save(product);

    if (!result) {
      throw new InvariantError('Product failed to add');
    }
    // Array
    if (result.length) {
      return result.map((item: Record<string, unknown>) => item.id);
    }
    // Object
    return result.id;
  }

  async getProducts(): Promise<Array<Product | undefined>> {
    const result = await this.productRepository.find();

    return result;
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const result = await this.productRepository.findOne(id);
    if (!result) {
      throw new NotFoundError('Product not found');
    }
    return result;
  }

  async updateProductById(id: string, payload: any): Promise<any> {
    const product = await this.getProductById(id);
    payload.id = id;
    const result = this.productRepository.save({
      ...product,
      ...payload,
    });

    if (!result) {
      throw new InvariantError('Product failed to add');
    }

    return result;
  }

  async deleteProductById(id: string): Promise<void> {
    await this.getProductById(id);
    await this.productRepository.delete(id);
  }

  async deleteProducts(payload: Array<any>): Promise<void> {
    const notFoundProducts: Array<string> = [];
    // eslint-disable-next-line no-loops/no-loops
    for (const item of payload) {
      const result = await this.productRepository.findOne(item.id);
      if (!result) {
        notFoundProducts.push(item.id);
      } else {
        await this.productRepository.delete(item.id);
      }
    }
    if (notFoundProducts.length) {
      throw new NotFoundError(`Product with id [${notFoundProducts}] not found`);
    }
  }
}
