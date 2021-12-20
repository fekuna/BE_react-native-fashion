import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderCreateResponseDto } from './dto/order-create-response.dto';
import { OrderItemDto } from './dto/order-item.dto';
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

  async orderCreate(
    userId: string,
    orderItems: OrderItemDto[],
  ): Promise<OrderCreateResponseDto> {
    const order = await this.orderRepository.save({
      user: {
        id: userId,
      },
    });

    orderItems = orderItems.map((orderItem) => ({
      ...orderItem,
      order: {
        id: order.id,
      },
    }));

    await this.orderItemRepository.save(orderItems);

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
