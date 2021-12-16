import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  role: string;

  @Column({ nullable: true })
  rt_hash: string;
}
