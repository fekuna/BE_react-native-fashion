import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { CartModule } from 'src/cart/cart.module';
import { ProductModule } from 'src/product/product.module';
import { OrderStatus } from './entities/order-status.entity';
import { OrderItemStatus } from './entities/order-item-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem, Order, OrderStatus, OrderItemStatus]),
    CartModule,
    ProductModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
