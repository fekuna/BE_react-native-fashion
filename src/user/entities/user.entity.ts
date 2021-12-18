import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Product } from 'src/product/entities/product.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  rt_hash: string;

  @OneToMany(() => Product, (product) => product.user)
  @Exclude({ toPlainOnly: true })
  products: Product[];

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
