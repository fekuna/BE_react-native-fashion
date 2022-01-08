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
import { OrderStatusService } from './order-status.service';
import { OrderItemStatusService } from './order-item-status.service';
import { OrderStatusController } from './order-status.controller';
import { OrderItemStatusController } from './order-item-status.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem, Order, OrderStatus, OrderItemStatus]),
    CartModule,
    ProductModule,
  ],
  providers: [OrderService, OrderStatusService, OrderItemStatusService],
  controllers: [
    OrderController,
    OrderStatusController,
    OrderItemStatusController,
  ],
})
export class OrderModule {}
