import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { ProductCreateDto } from './dto/product-create.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductUpdateDto } from './dto/product-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getProducts(@Query() filter: FilterProductsDto): Promise<Product[]> {
    console.log('Product Controller', filter);
    return this.productService.getProducts(filter);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body() createProductDto: ProductCreateDto,
    @GetCurrentUserId() user: string,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto, user);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('id') productId: number,
    @Body() body: ProductUpdateDto,
  ): Promise<any> {
    return this.productService.updateProduct(productId, body);
  }
}
