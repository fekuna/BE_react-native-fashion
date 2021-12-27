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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { CartFilterDto } from './dto/cart-filter.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getProducts(
    @GetCurrentUserId() userId,
    @Query() filter: CartFilterDto,
  ): Promise<Cart[]> {
    console.log('Cart Controller', filter);
    return this.cartService.getCart(userId, filter);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addToCart(
    @GetCurrentUserId() userId: string,
    @Body() data: AddCartItemDto,
  ) {
    return await this.cartService.addToCart(userId, data);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateCartItem(
    @Param('id') cartItemId: number,
    @Body() body: UpdateCartItemDto,
  ): Promise<any> {
    return this.cartService.updateCartItem(cartItemId, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteCartItem(@Param('id') cartItemId: number) {
    return this.cartService.deleteCartItem(cartItemId);
  }
}
