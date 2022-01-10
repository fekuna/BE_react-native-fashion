import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';

@Controller('orderitems')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getorderItem(): Promise<any> {
    return this.orderItemService.getOrderItems();
  }

  @Put('/status/:id')
  async updateOrderItemStatus(
    @Param('id') orderItemId: number,
    @Body('statusId') statusId: number,
  ): Promise<any> {
    return this.orderItemService.updateOrderItemStatus(orderItemId, statusId);
  }

  @Delete('/:id')
  async deleteOrderItemStatus(@Param('id') orderItemId: number): Promise<any> {
    return this.orderItemService.deleteOrderItem(orderItemId);
  }
}
