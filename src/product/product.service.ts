import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProductCreateDto } from './dto/product-create.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { Product } from './entities/product.entity';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async getProductBy({
    id,
    relations,
  }: {
    id?: number;
    relations?: string[];
  }): Promise<Product> {
    const found = await this.productRepository.findOne({
      where: [{ id }],
      relations,
    });

    if (!found) {
      throw new NotFoundException(`Product not found`);
    }

    return found;
  }

  async getProducts(filter: FilterProductsDto): Promise<any> {
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
    images: Express.Multer.File[],
  ): Promise<Product> {
    const product = await this.productRepository
      .create({
        ...createProductDto,
        user: {
          id: userId,
        },
      })
      .save();

    const productImages = images.map((image) => {
      return {
        imgPath: image.filename,
        product: {
          id: product.id,
        },
      };
    });

    await this.productImageRepository.save(productImages);

    console.log('Product CREATED:', product);
    console.log('ProductImages CREATED:', productImages);

    console.log({
      ...createProductDto,
      userId,
      images,
    });

    return product;
  }

  async updateProduct(id: number, data: ProductUpdateDto): Promise<any> {
    return await this.productRepository.update(id, data);
  }
}
