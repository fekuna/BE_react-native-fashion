import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSize } from './entities/product-size.entity';

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectRepository(ProductSize)
    private readonly productSizeRepository: Repository<ProductSize>,
  ) {}

  async getProductSizes(relations = []): Promise<any> {
    return this.productSizeRepository.find({ relations });
  }

  async createProductSize(data): Promise<any> {
    return this.productSizeRepository.save(data);
  }

  async updateProductSize(id: number, data): Promise<any> {
    return this.productSizeRepository.update(id, data);
  }

  async deleteProductSize(id: number): Promise<any> {
    return this.productSizeRepository.delete(id);
  }
}
