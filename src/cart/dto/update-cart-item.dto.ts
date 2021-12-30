import { IsNotEmpty, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
