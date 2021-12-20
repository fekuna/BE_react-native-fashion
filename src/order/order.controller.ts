import { Controller, Post } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@GetCurrentUserId() userId: string): Promise<any> {
    return await this.orderService.orderCreate(userId);
  }
}
