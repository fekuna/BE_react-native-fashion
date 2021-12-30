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
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPermissions(): Promise<Category[]> {
    return this.categoryService.all();
  }

  @Post()
  async createCategory(@Body('name') name: string): Promise<Category> {
    return this.categoryService.create({ name });
  }

  @Put('/:id')
  async updateCategory(
    @Param('id') categoryId: number,
    @Body('name') name: string,
  ): Promise<any> {
    return this.categoryService.update(categoryId, { name });
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') CategoryId): Promise<any> {
    return this.categoryService.delete(CategoryId);
  }
}
