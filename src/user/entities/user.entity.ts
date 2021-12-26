import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Factory } from 'nestjs-seeder';

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

  @Factory((faker) => faker.name.findName())
  @Column()
  name: string;

  @Factory((faker) => faker.internet.email())
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Factory((faker) => faker.address.streetAddress())
  @Column({ nullable: true })
  address: string;

  @Column({ default: 'users/img/profile-default.jpg' })
  img: string;

  @Factory('Asd123')
  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  rt_hash: string;

  @OneToMany(() => Product, (product) => product.user)
  // @Exclude({ toPlainOnly: true })
  products: Product[];

  @Factory(1)
  @ManyToOne(() => Role, (role) => role.users, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  @Exclude({ toPlainOnly: true })
  orders: Order[];
}
