import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { OrderCreateResponseDto } from './dto/order-create-response.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly cartService: CartService,
  ) {}

  async orderCreate(userId: string): Promise<OrderCreateResponseDto> {
    const cartItems = await this.cartService.getCart(userId, {}, [
      'product',
      'product.product_images',
    ]);
    console.log('Order Create', cartItems.data);

    // Check to ensure order quantity is not more than product stock
    cartItems.data.map((item) => {
      console.log('check product');
      if (item.quantity > item.product.stock) {
        throw new BadRequestException(
          `Order with product ID #${item.id}, order quantity more than product stock`,
        );
      }
    });

    const order = await this.orderRepository.save({
      user: {
        id: userId,
      },
    });

    let orderItems = [];
    let updateProducts = [];
    cartItems.data.map((cartItem) => {
      orderItems = [
        ...orderItems,
        {
          product_title: cartItem.product.title,
          price: cartItem.product.price,
          quantity: cartItem.quantity,
          image:
            cartItem.product.product_images.length > 0
              ? cartItem.product.product_images[0].imgPath
              : 'product-default.png',
          order: {
            id: order.id,
          },
        },
      ];
      updateProducts = [
        ...updateProducts,
        {
          ...cartItem.product,
          stock: cartItem.product.stock - cartItem.quantity,
        },
      ];
    });

    console.log('Order Items', orderItems);
    console.log('update Items', updateProducts);
    await this.orderItemRepository.save(orderItems);

    // await this.cartService.deleteCartUser(userId);
    return {
      id: order.id,
      createdAt: order.created_at,
      userId: order.user.id,
      orderItems,
    };
  }

  async getOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['order_items'],
    });
  }

  async getOrderUser(userId: string): Promise<any> {
    return await this.orderRepository.find({
      relations: ['order_items'],
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
