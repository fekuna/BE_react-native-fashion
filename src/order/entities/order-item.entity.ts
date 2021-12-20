import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @ManyToOne(() => Order, (order) => order.order_items)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
