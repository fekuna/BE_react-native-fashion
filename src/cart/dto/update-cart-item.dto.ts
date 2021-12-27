import { IsNotEmpty, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
