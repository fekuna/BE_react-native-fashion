import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderStatus } from './entities/order-status.entity';
import { OrderStatusService } from './order-status.service';

@Controller('orderstatus')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrderStatuss(): Promise<OrderStatus[]> {
    return this.orderStatusService.getOrderStatus();
  }

  @Post()
  async createOrderStatus(@Body('name') name: string): Promise<OrderStatus> {
    return this.orderStatusService.createOrderStatus({ name });
  }

  @Put('/:id')
  async updateOrderStatus(
    @Param('id') orderStatusId: number,
    @Body('name') name: string,
  ): Promise<any> {
    return this.orderStatusService.updateOrderStatus(orderStatusId, { name });
  }

  @Delete('/:id')
  async deleteOrderStatus(@Param('id') orderStatusId): Promise<any> {
    return this.orderStatusService.deleteOrderStatus(orderStatusId);
  }
}
