import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';
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
    private readonly productService: ProductService,
  ) {}

  async orderCreate(
    userId: string,
    shippingFee: number,
    address: string,
  ): Promise<OrderCreateResponseDto> {
    const cartItems = await this.cartService.getCart(userId, {}, [
      'product',
      'product.product_images',
      'product.seller',
    ]);
    console.log('Order Create', cartItems.data);

    if (cartItems.data.length < 1) {
      throw new BadRequestException(`No item found in cart, please add some`);
    }

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
      shipping_fee: shippingFee,
      status: {
        id: 1,
      },
      address,
    });

    console.log('orderCreate', order);

    let orderItems = [];
    let updateProducts = [];
    cartItems.data.map((cartItem) => {
      // Push to orderItems
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
          status: {
            id: 1,
          },
          size: cartItem.size,
          sellerId: cartItem.product.seller.id,
        },
      ];

      // Push to updateProducts
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

    await this.productService.bulkUpdate(updateProducts);

    await this.cartService.deleteCartUser(userId);
    return {
      id: order.id,
      createdAt: order.created_at,
      userId: order.user.id,
      statusId: order.status.id,
      shippingFee,
      address,
      orderItems,
    };
  }

  async getOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['order_items', 'status', 'order_items.status'],
    });
  }

  async getOrderUser(userId: string): Promise<any> {
    return await this.orderRepository.find({
      relations: ['order_items', 'status', 'order_items.status'],
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async getOrderUserGroupByDate(userId: string): Promise<any> {
    // const orderGroup = await this.orderRepository.query(
    //   'SELECT SUM(), MONTH(orders.created_at) as month, created_at FROM orders JOIN  GROUP BY MONTH(orders.created_at)',
    // );
    const orderGroup = await this.orderRepository.query(
      `SELECT orders.id as id, orders.created_at as createdAt, SUM((order_items.price * order_items.quantity) + orders.shipping_fee) as totalPrice FROM orders JOIN order_items ON orders.id = order_items.order_id WHERE orders.user_id = ? GROUP BY MONTH(orders.created_at)`,
      [userId],
    );

    return orderGroup;
  }
}
