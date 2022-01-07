import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sizes')
export class ProductSize {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
