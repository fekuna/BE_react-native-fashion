import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { editFileName, imageFileFilter } from './utils/user-file-upload.utils';

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

  @Public()
  @Get('/img/:imgpath')
  userImage(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files/images/profile' });
  }

  @Put('/img')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/images/profile',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async userUpdateImage(
    @GetCurrentUser() user: JwtPayloadDto,
    @UploadedFile() file,
  ) {
    return this.userService.userUpdatePhoto(user, file.filename);
  }

  @Put('/:id')
  async userProfileUpdate(
    @GetCurrentUserId() userId: string,
    @Body() data: UserUpdateDto,
  ) {
    return this.userService.userUpdate(userId, data);
  }
}
