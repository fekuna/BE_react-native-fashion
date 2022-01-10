import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { OrderCreateRequest } from './dto/order-create-request';
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
    @Body() data: OrderCreateRequest,
  ): Promise<OrderCreateResponseDto> {
    return await this.orderService.orderCreate(
      userId,
      data.shippingFee,
      data.address,
    );
  }

  @Get('user')
  async getOrderUser(@GetCurrentUserId() userId: string): Promise<any> {
    return await this.orderService.getOrderUser(userId);
  }

  @Get('/graph')
  async getOrderUserGroupByDate(
    @GetCurrentUserId() userId: string,
  ): Promise<any> {
    return await this.orderService.getOrderUserGroupByDate(userId);
  }

  @Put('/status/:id')
  async updateOrderStatus(
    @Param('id') orderId: number,
    @Body('statusId') statusId: number,
  ): Promise<any> {
    return await this.orderService.updateOrderStatus(orderId, statusId);
  }
}
