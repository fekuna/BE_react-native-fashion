import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemStatus } from './entities/order-item-status.entity';

@Injectable()
export class OrderItemStatusService {
  constructor(
    @InjectRepository(OrderItemStatus)
    private readonly orderItemStatusRepository: Repository<OrderItemStatus>,
  ) {}

  async getOrderItemStatus(relations = []): Promise<any> {
    return this.orderItemStatusRepository.find({ relations });
  }

  async createOrderItemStatus(data): Promise<any> {
    return this.orderItemStatusRepository.save(data);
  }

  async updateOrderItemStatus(id: number, data): Promise<any> {
    return this.orderItemStatusRepository.update(id, data);
  }

  async deleteOrderItemStatus(id: number): Promise<any> {
    return this.orderItemStatusRepository.delete(id);
  }
}
