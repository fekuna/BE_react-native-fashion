import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './entities/user.entity';

import * as fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async getUserBy({
    id,
    email,
    relations,
  }: {
    id?: string;
    email?: string;
    relations?: [string];
  }): Promise<User> {
    const found = await this.userRepository.findOne({
      where: [{ id }, { email }],
      relations,
    });

    console.log('getUserBy wkowkok', found);

    if (!found) {
      throw new NotFoundException(`User not found`);
    }

    return found;
  }

  async userCreate(data: UserCreateDto, roleId: string): Promise<User> {
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
      role: {
        id: roleId,
      },
    });

    return created;
  }

  async userUpdate(id: string, data: UserUpdateDto): Promise<void> {
    await this.userRepository.update(id, data);
  }

  async userUpdatePhoto(userId: string, imgName: string): Promise<void> {
    console.log('userUpdatePhoto', { userId });
    try {
      await this.userRepository.update(userId, {
        img: `users/img/${imgName}`,
      });
    } catch (err) {
      await unlinkAsync(`./files/images/profile/${imgName}`);
      throw new BadRequestException(`Something went wrong, try again later.`);
    }

    // if (user.img !== 'users/img/profile-default.jpg') {
    //   console.log('hehe', user.img);
    //   const oldImageName = user.img.split('/');
    //   console.log('xixi:', oldImageName);
    //   // await unlinkAsync(`./files/images/profile/${oldImageName}`);
    // }
  }
}
