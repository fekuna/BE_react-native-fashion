import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Cart } from 'src/cart/entities/cart.entity';

import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: 'users/img/profile-default.jpg' })
  img: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  rt_hash: string;

  @OneToMany(() => Product, (product) => product.seller)
  // @Exclude({ toPlainOnly: true })
  products: Product[];

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  @Exclude({ toPlainOnly: true })
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];
}
