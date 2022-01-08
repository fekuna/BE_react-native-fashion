import { IsNotEmpty } from 'class-validator';

export class FilterProductsDto {
  page?: number = 1;
  take?: number;
  keyword?: string = '';
  categoryId?: number;
}
