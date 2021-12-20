import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUserBy({
      id,
    });
    console.log('User Controller', user);
    return user;
  }
}
