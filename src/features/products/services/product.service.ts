import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { Product } from '../entities';
import { NotFoundError } from '../../../core/errors';
import { BadRequestError } from '../../../core/errors';
import { CreateProductsReq, DeleteProductsReq, ProductData, UpdateProductByIdReq } from '../types';

@Service()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  async createProduct(body: CreateProductsReq[]): Promise<ProductData | ProductData[]> {
    const product = this.productRepository.create(body);
    const result: ProductData[] = await this.productRepository.save(product);

    if (!result) {
      throw new BadRequestError('Product failed to add');
    }
    // Array
    if (result.length) {
      return result;
    }
    // Object
    return result[0];
  }

  async getProducts(): Promise<ProductData | ProductData[]> {
    const result = await this.productRepository.find();

    return result;
  }

  async getProductById(id: string): Promise<ProductData> {
    const result = await this.productRepository.findOne(id);
    if (!result) {
      throw new NotFoundError('Product not found');
    }
    return result;
  }

  async updateProductById(id: string, body: UpdateProductByIdReq): Promise<ProductData> {
    const product = await this.getProductById(id);
    const result = this.productRepository.save({
      ...product,
      ...body,
    });

    if (!result) {
      throw new BadRequestError('Product failed to add');
    }

    return result;
  }

  async deleteProductById(id: string): Promise<void> {
    await this.getProductById(id);
    await this.productRepository.delete(id);
  }

  async deleteProducts(body: DeleteProductsReq[]): Promise<void> {
    const notFoundProducts: Array<string> = [];
    // eslint-disable-next-line no-loops/no-loops
    for (const item of body) {
      const result = await this.productRepository.findOne(item.id);
      if (!result) {
        notFoundProducts.push(item.id);
        if (notFoundProducts.length) {
          throw new NotFoundError(`Product with id [${notFoundProducts}] not found`);
        }
      }
    }

    // eslint-disable-next-line no-loops/no-loops
    for (const item of body) {
      await this.productRepository.delete(item.id);
    }
  }
}
