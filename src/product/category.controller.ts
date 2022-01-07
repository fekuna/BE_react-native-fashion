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
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categorySevice: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCategories(): Promise<Category[]> {
    console.log('getCategories');
    return this.categorySevice.getCategories();
  }

  @Post()
  async createCategory(@Body('name') name: string): Promise<Category> {
    return this.categorySevice.createCategory({ name });
  }

  @Put('/:id')
  async updateCategory(
    @Param('id') categoryId: number,
    @Body('name') name: string,
  ): Promise<any> {
    return this.categorySevice.updateCategory(categoryId, { name });
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') CategoryId): Promise<any> {
    return this.categorySevice.deleteCategory(CategoryId);
  }
}
