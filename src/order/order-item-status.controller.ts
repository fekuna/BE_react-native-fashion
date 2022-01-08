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
import { OrderItemStatus } from './entities/order-item-status.entity';
import { OrderItemStatusService } from './order-item-status.service';

@Controller('orderitemstatus')
export class OrderItemStatusController {
  constructor(
    private readonly orderItemStatusService: OrderItemStatusService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getorderItemStatuss(): Promise<OrderItemStatus[]> {
    return this.orderItemStatusService.getOrderItemStatus();
  }

  @Post()
  async createOrderItemStatus(
    @Body('name') name: string,
  ): Promise<OrderItemStatus> {
    return this.orderItemStatusService.createOrderItemStatus({ name });
  }

  @Put('/:id')
  async updateOrderItemStatus(
    @Param('id') orderItemStatusId: number,
    @Body('name') name: string,
  ): Promise<any> {
    return this.orderItemStatusService.updateOrderItemStatus(
      orderItemStatusId,
      { name },
    );
  }

  @Delete('/:id')
  async deleteOrderItemStatus(@Param('id') orderItemStatusId): Promise<any> {
    return this.orderItemStatusService.deleteOrderItemStatus(orderItemStatusId);
  }
}
