import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async orderCreate(userId: string) {
    const testOrderItems = [
      {
        product_title: 'test_product',
        price: 2,
        quantity: 5,
      },
      {
        product_title: 'test_product2',
        price: 4,
        quantity: 10,
      },
      {
        product_title: 'test_product3',
        price: 10,
        quantity: 2,
      },
    ];

    const order = await this.orderRepository.save({
      user: {
        id: userId,
      },
    });

    const testOrderItemsWithOrderId = await testOrderItems.map((oi) => ({
      ...oi,
      order: {
        id: order.id,
      },
    }));

    const orderItems = await this.orderItemRepository.save(
      testOrderItemsWithOrderId,
    );

    console.log(orderItems);
  }
}
