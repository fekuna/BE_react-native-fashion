import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
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
    return this.productService.getProducts(filter, [
      'product_images',
      'categories',
      'user_favorites',
      'sizes',
    ]);
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
    console.log('createProductController: ', createProductDto);
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

  @Delete('/:id')
  async deleteProduct(
    @Param('id') productId: number,
    @GetCurrentUserId() userId: string,
  ): Promise<any> {
    return this.productService.deleteProduct(productId, userId);
  }

  @Public()
  @Get('/:imgpath')
  userImage(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files/images/product' });
  }

  @Delete('/img/:id')
  deleteProductImage(@Param('id') imgId: number) {
    return this.productService.deleteProductImage(imgId);
  }
}
