import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { CartFilterDto } from './dto/cart-filter.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productService: ProductService,
  ) {}

  async getCartItemBy({
    id,
    productId,
    relations,
  }: {
    id?: number;
    productId?: number;
    relations?: string[];
  }) {
    const cartItem = await this.cartRepository.findOne({
      where: [
        { id },
        {
          product: {
            id: productId,
          },
        },
      ],
      relations,
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return cartItem;
  }

  async getCart(
    userId: string,
    filter: CartFilterDto,
    relations: string[] = [],
  ): Promise<any> {
    console.log('getCart', { relations, userId });
    const { take, page } = filter;
    const skip = (page - 1) * take;

    const [data, total] = await this.cartRepository.findAndCount({
      where: [
        {
          user: {
            id: userId,
          },
        },
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

  async addToCart(userId: string, data: AddCartItemDto) {
    const cartItem = await this.cartRepository.findOne({
      where: {
        product: {
          id: data.productId,
        },
      },
    });

    const productFound = await this.productService.getProductBy({
      id: data.productId,
      relations: ['seller'],
    });
    console.log('Add To Cart');

    if (
      cartItem?.quantity + data.quantity > productFound?.stock ||
      data.quantity > productFound?.stock
    ) {
      console.log('stock is not sufficient');
      throw new BadRequestException('Stock is not sufficient');
    }

    if (cartItem) {
      console.log('Item already exists');
      return await this.cartRepository.update(cartItem.id, {
        quantity: cartItem.quantity + data.quantity,
      });
    }

    return await this.cartRepository.save({
      quantity: data.quantity,
      product: {
        id: data.productId,
      },
      user: {
        id: userId,
      },
    });
  }

  async updateCartItem(cartItemId: number, data: UpdateCartItemDto) {
    const productFound = await this.getCartItemBy({
      id: cartItemId,
      relations: ['product'],
    });

    console.log('updateCartItem', productFound);

    if (data.quantity > productFound.product.stock) {
      console.log('stock is not sufficient');
      throw new BadRequestException('Stock is not sufficient');
    }

    return await this.cartRepository.update(cartItemId, {
      quantity: data.quantity,
    });
  }

  async deleteCartItem(id: number) {
    return await this.cartRepository.delete(id);
  }

  async deleteCartUser(userId: string) {
    return await this.cartRepository.delete({ user: { id: userId } });
  }
}
