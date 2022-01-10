import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async getOrderItems(relations = []): Promise<any> {
    return this.orderItemRepository.find({ relations });
  }

  async updateOrderItemStatus(id: number, statusId: number): Promise<any> {
    return this.orderItemRepository.update(id, { status: { id: statusId } });
  }

  async deleteOrderItem(id: number): Promise<any> {
    return this.orderItemRepository.delete(id);
  }
}
