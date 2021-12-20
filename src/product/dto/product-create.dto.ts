import { IsNotEmpty } from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;
}
