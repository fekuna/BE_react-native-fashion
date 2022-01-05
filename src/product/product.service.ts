import * as fs from 'fs';
import { promisify } from 'util';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProductCreateDto } from './dto/product-create.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { Product } from './entities/product.entity';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductImage } from './entities/product-image.entity';

const unlinkAsync = promisify(fs.unlink);

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
    userId,
    relations,
  }: {
    id?: number;
    userId?: string;
    relations?: string[];
  }): Promise<Product> {
    console.log({ userId });
    const found = await this.productRepository.findOne({
      where: id && userId ? { id, user: { id: userId } } : [{ id }],
      relations,
    });

    if (!found) {
      throw new NotFoundException(`Product not found`);
    }

    return found;
  }

  async getProducts(
    filter: FilterProductsDto,
    relations: string[] = [],
  ): Promise<any> {
    const { take, page, keyword } = filter;
    const skip = (page - 1) * take;

    const [data, total] = await this.productRepository.findAndCount({
      where: [
        { title: Like('%' + keyword + '%') },
        { description: Like('%' + keyword + '%') },
      ],
      relations,
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
    console.log('images: ', images);
    const product = await this.productRepository
      .create({
        ...createProductDto,
        seller: {
          id: userId,
        },
        categories: createProductDto.categories?.map((id) => ({ id })),
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
    console.log('update product service');

    const found = await this.getProductBy({ id });

    return await this.productRepository.save({
      ...found,
      ...data,
      categories: data.categories?.map((id) => ({ id })),
    });
  }

  async deleteProduct(id: number, userId: string): Promise<any> {
    const product = await this.getProductBy({
      id,
      userId,
      relations: ['product_images'],
    });
    console.log('DELETE product', product);
    await this.productRepository.delete({ id });

    if (product.product_images.length > 0) {
      product.product_images.map(async (pImage) => {
        await unlinkAsync(`./files/images/product/${pImage.imgPath}`);
      });
    }
  }

  async deleteProductImage(id: number): Promise<any> {
    const found = await this.productImageRepository.findOne(id);
    await this.productImageRepository.delete(found);
    await unlinkAsync(`./files/images/product/${found.imgPath}`);

    await console.log('Delete Product Image found', found);
  }

  async bulkUpdate(data: ProductUpdateDto[]): Promise<any> {
    console.log('bulkUpdate: ', data);
    const filtered = data.map((pItem) => {
      const { id, title, description, stock, price } = pItem;
      return {
        id,
        title,
        description,
        stock,
        price,
      };
    });

    return await this.productRepository.save(filtered);
  }
}
