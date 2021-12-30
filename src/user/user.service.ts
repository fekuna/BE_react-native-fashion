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
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';

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
    relations?: string[];
  }): Promise<User> {
    const found = await this.userRepository.findOne({
      where: [{ id }, { email }],
      relations,
    });

    if (!found) {
      throw new NotFoundException(`User not found`);
    }

    return found;
  }

  async userCreate(data: UserCreateDto, roleId: number): Promise<User> {
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

  async userUpdatePhoto(user: JwtPayloadDto, newImage: string): Promise<void> {
    try {
      await this.userRepository.update(user.sub, {
        img: `users/img/${newImage}`,
      });
    } catch (err) {
      console.log(err);
      await unlinkAsync(`./files/images/profile/${newImage}`);
      throw new BadRequestException(`Something went wrong, try again later.`);
    }

    if (user.img !== 'users/img/profile-default.jpg') {
      const oldImageName = user.img.split('/')[2];
      await unlinkAsync(`./files/images/profile/${oldImageName}`);
    }
  }
}
