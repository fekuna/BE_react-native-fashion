import { Expose } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items: OrderItem[];

  @Expose()
  get total(): number {
    return this.order_items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  }
}
