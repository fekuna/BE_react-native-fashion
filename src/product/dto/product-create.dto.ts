import { IsNotEmpty } from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;

  categories?: Array<number>;
  sizes?: Array<number>;
}
