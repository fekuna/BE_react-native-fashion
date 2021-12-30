import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  imgPath: string;

  @ManyToOne(() => Product, (product) => product.product_images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
