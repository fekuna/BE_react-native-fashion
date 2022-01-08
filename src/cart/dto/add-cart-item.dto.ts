import { IsNotEmpty } from 'class-validator';

export class AddCartItemDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  size?: string;
}
