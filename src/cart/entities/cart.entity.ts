import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cart')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}