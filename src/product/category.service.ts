import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(relations = []): Promise<any> {
    return this.categoryRepository.find({ relations });
  }

  async createCategory(data): Promise<any> {
    return this.categoryRepository.save(data);
  }

  async updateCategory(id: number, data): Promise<any> {
    return this.categoryRepository.update(id, data);
  }

  async deleteCategory(id: number): Promise<any> {
    return this.categoryRepository.delete(id);
  }
}
