import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    console.log('hoho');
  }

  async seed(): Promise<any> {
    // Generate 10 users.
    const users = DataFactory.createForClass(User).generate(10);

    // Insert into the database.
    return this.userRepository.save(users);
  }

  async drop(): Promise<any> {
    return this.userRepository.delete({});
  }
}
