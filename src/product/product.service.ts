import * as fs from 'fs';
import { promisify } from 'util';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProductCreateDto } from './dto/product-create.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { Product } from './entities/product.entity';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductImage } from './entities/product-image.entity';
import { Category } from './entities/category.entity';

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getProductBy({
    id,
    sellerId,
    relations,
  }: {
    id?: number;
    sellerId?: string;
    relations?: string[];
  }): Promise<Product> {
    console.log({ sellerId });
    const found = await this.productRepository.findOne({
      where: id && sellerId ? { id, seller: { id: sellerId } } : [{ id }],
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
    const { take, page, keyword, categoryId } = filter;
    console.log('getProducts', { take, page, keyword, categoryId });
    const skip = (page - 1) * take;
    console.log('getProducts', categoryId);

    const [data, total] = await this.productRepository.findAndCount({
      where: (qb) => {
        qb.where([
          { title: Like('%' + keyword + '%') },
          { description: Like('%' + keyword + '%') },
        ]);

        if (categoryId && +categoryId !== 0) {
          console.log('inside IF categoryId');
          qb.andWhere('productCategories.id = :categoryId', { categoryId });
        }
      },
      join: {
        alias: 'prods',
        innerJoinAndSelect: {
          productCategories: 'prods.categories',
        },
      },
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
    // console.log('images: ', images);
    // console.log('ProductCreateDto: ', createProductDto);
    const product = await this.productRepository
      .create({
        ...createProductDto,
        seller: {
          id: userId,
        },
        categories: createProductDto.categories?.map((id) => ({ id })),
        sizes: createProductDto.sizes?.map((id) => ({ id })),
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
      sizes: data.sizes?.map((id) => ({ id })),
    });
  }

  async deleteProduct(id: number, sellerId: string): Promise<any> {
    const product = await this.getProductBy({
      id,
      sellerId,
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

  async addProductFavorite(userId: string, productId: number): Promise<any> {
    const product = await this.productRepository.findOne({
      where: (qb) => {
        qb.where({ id: productId });
        //   .andWhere('user_favorites.id = :userId', {
        //   userId,
        // });
      },
      join: {
        alias: 'prods',
        leftJoinAndSelect: {
          user_favorites: 'prods.user_favorites',
        },
      },
    });

    const found = product.user_favorites.some(
      (uFavorite) => uFavorite.id === userId,
    );

    if (found) {
      return await this.productRepository.save({
        ...product,
        user_favorites: product.user_favorites.filter(
          (favorite) => favorite.id !== userId,
        ),
      });
    }

    // console.log('addProductFavorite', product);

    return await this.productRepository.save({
      ...product,
      user_favorites: [...product.user_favorites, { id: userId }],
    });
  }

  async getProductFavorites(userId: string): Promise<any> {
    try {
      return await this.productRepository.find({
        where: (qb) => {
          qb.where('user_favorites.id = :userId', {
            userId,
          });
        },
        join: {
          alias: 'prods',
          leftJoinAndSelect: {
            user_favorites: 'prods.user_favorites',
          },
        },
        relations: ['product_images', 'sizes'],
      });
    } catch (err) {
      throw new BadRequestException('Failed to get Product Favorites');
    }
  }

  async removeProductFavorite(userId: string, productId: number): Promise<any> {
    let product;
    try {
      product = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['user_favorites'],
      });
    } catch (err) {
      throw new NotFoundException('Product not found');
    }

    try {
      return await this.productRepository.save({
        ...product,
        user_favorites: product.user_favorites.filter(
          (uFavorite) => uFavorite.id !== userId,
        ),
      });
    } catch (err) {
      throw new BadRequestException('Failed to remove user product favorite');
    }

    // console.log('removeProductFavorite', product);
  }
}
