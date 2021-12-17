import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProductCreateDto } from './dto/product-create.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { Product } from './entities/product.entity';
import { ProductUpdateDto } from './dto/product-update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(filter: FilterProductsDto): Promise<any> {
    console.log('Product Service', filter);
    const { take, page, keyword } = filter;
    const skip = (page - 1) * take;

    const [data, total] = await this.productRepository.findAndCount({
      where: [
        { title: Like('%' + keyword + '%') },
        { description: Like('%' + keyword + '%') },
      ],
      take,
      skip,
    });

    const lastPage = Math.ceil(total / take);
    const nextPage = +page + 1 > lastPage ? null : +page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data,
      meta: {
        total,
        currentPage: page,
        lastPage,
        nextPage,
        prevPage,
      },
    };
  }

  async createProduct(
    createProductDto: ProductCreateDto,
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

  async updateProduct(id: number, data: ProductUpdateDto): Promise<any> {
    return await this.productRepository.update(id, data);
  }
}
