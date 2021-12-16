import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserBy({
    id,
    email,
  }: {
    id?: string;
    email?: string;
  }): Promise<User> {
    const found = await this.userRepository.findOne({
      where: [{ id }, { email }],
    });

    if (!found) {
      throw new NotFoundException(`User not found`);
    }

    console.log('user', found);

    return found;
  }

  async userCreate(data: UserCreateDto): Promise<User> {
    const emailExists = await this.userRepository.findOne({
      email: data.email,
    });

    if (emailExists) {
      throw new ConflictException('Email already registered');
    }

    const created = await this.userRepository.save({
      email: data.email,
      name: data.name,
      password: data.hashPassword,
      role: 'user',
    });

    return created;
  }

  async userUpdate(id: string, data: UserUpdateDto): Promise<void> {
    await this.userRepository.update(id, data);
  }
}
