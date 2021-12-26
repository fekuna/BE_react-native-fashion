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
  UploadedFiles,
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
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editProductImageName,
  productImageFilter,
} from './utils/product-file-upload.utils';

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
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './files/images/product',
        filename: editProductImageName,
      }),
      fileFilter: productImageFilter,
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body() createProductDto: ProductCreateDto,
    @GetCurrentUserId() userId: string,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto, userId, images);
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
