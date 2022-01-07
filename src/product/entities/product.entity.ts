import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';
import { ProductSize } from './product-size.entity';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('double')
  price: number;

  @Column()
  stock: number;

  @ManyToMany(() => ProductSize)
  @JoinTable({
    name: 'product_sizes',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'size_id', referencedColumnName: 'id' },
  })
  sizes: ProductSize[];

  @OneToMany(() => ProductImage, (pImage) => pImage.product)
  product_images: ProductImage[];

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_categories',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_favorites',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  user_favorites: User[];
}
