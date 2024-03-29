import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItemStatus } from './order-item-status.entity';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  product_title: string;

  @Column('double')
  price: number;

  @Column()
  quantity: number;

  @Column()
  image: string;

  @Column({ nullable: true })
  size: string;

  @ManyToOne(() => OrderItemStatus)
  @JoinColumn({ name: 'status_id' })
  status: OrderItemStatus;

  @Column({ name: 'seller_id' })
  sellerId: string;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => Order, (order) => order.order_items)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
