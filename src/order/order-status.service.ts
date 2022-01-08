import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from './entities/order-status.entity';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
  ) {}

  async getOrderStatus(relations = []): Promise<any> {
    return this.orderStatusRepository.find({ relations });
  }

  async createOrderStatus(data): Promise<any> {
    return this.orderStatusRepository.save(data);
  }

  async updateOrderStatus(id: number, data): Promise<any> {
    return this.orderStatusRepository.update(id, data);
  }

  async deleteOrderStatus(id: number): Promise<any> {
    return this.orderStatusRepository.delete(id);
  }
}
