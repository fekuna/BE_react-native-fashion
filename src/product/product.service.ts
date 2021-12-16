import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['user'] });
  }

  async createProduct(
    createProductDto: CreateProductDto,
    userId: string,
  ): Promise<Product> {
    const product = await this.productRepository.create({
      ...createProductDto,
      user: {
        id: userId,
      },
    });

    console.log({
      ...createProductDto,
      userId,
    });

    await product.save();

    return product;
  }
}
