import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { Category } from './entities/category.entity';
import { ProductSize } from './entities/product-size.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ProductSizeService } from './product-size.service';
import { ProductSizeController } from './product-size.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, Category, ProductSize]),
  ],
  providers: [ProductService, CategoryService, ProductSizeService],
  controllers: [ProductController, CategoryController, ProductSizeController],
  exports: [ProductService],
})
export class ProductModule {}
