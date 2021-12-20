import { IsNotEmpty } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  product_title: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;
}
