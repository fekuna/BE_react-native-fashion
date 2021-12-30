import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { OrderCreateResponseDto } from './dto/order-create-response.dto';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(): Promise<Order[]> {
    return await this.orderService.getOrders();
  }

  @Post()
  async createOrder(
    @GetCurrentUserId() userId: string,
  ): Promise<OrderCreateResponseDto> {
    return await this.orderService.orderCreate(userId);
  }

  @Get('user')
  async getOrderUser(@GetCurrentUserId() userId: string): Promise<any> {
    return await this.orderService.getOrderUser(userId);
  }
}
