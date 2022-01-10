import { OrderItemDto } from './order-item.dto';

export class OrderCreateResponseDto {
  id: number;
  createdAt: string;
  statusId: number;
  shippingFee: number;
  address: string;
  userId: string;
  orderItems: OrderItemDto[];
}
