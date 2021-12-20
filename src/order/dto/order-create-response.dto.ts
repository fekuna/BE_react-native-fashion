import { OrderItemDto } from './order-item.dto';

export class OrderCreateResponseDto {
  id: number;
  createdAt: string;
  userId: string;
  orderItems: OrderItemDto[];
}
