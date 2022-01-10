import { Expose } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './order-status.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  created_at: string;

  @Column()
  shipping_fee: number;

  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items: OrderItem[];

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'status_id' })
  status: OrderStatus;

  @Expose()
  get total(): number {
    return (
      this.order_items.reduce((sum, i) => sum + i.quantity * i.price, 0) +
      this.shipping_fee
    );
  }
}
