import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { ProductSizeService } from './product-size.service';

@Controller('sizes')
export class ProductSizeController {
  constructor(private readonly productSizeService: ProductSizeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProductSizes(): Promise<Category[]> {
    return this.productSizeService.getProductSizes();
  }

  @Post()
  async createCategory(@Body('name') name: string): Promise<Category> {
    return this.productSizeService.createProductSize({ name });
  }

  @Put('/:id')
  async updateCategory(
    @Param('id') productSizeId: number,
    @Body('name') name: string,
  ): Promise<any> {
    return this.productSizeService.updateProductSize(productSizeId, { name });
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') productSizeId): Promise<any> {
    return this.productSizeService.deleteProductSize(productSizeId);
  }
}
