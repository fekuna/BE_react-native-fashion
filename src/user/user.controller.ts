import {
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
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';

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
  async userUpdateImage(@GetCurrentUserId() userId, @UploadedFile() file) {
    console.log('userUpdateImage:', file);
    return this.userService.userUpdatePhoto(userId, file.filename);
  }
}
