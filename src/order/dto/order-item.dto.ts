import { IsNotEmpty } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  productTitle: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;
}
