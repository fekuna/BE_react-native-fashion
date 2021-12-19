import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { UserSigninDto, UserSignupDto } from './dto';
import { Tokens } from './types';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/user/signup')
  userSignup(@Body() data: UserSignupDto): Promise<Tokens> {
    return this.authService.userSignup(data);
  }

  @Public()
  @Post('/user/signin')
  @HttpCode(HttpStatus.OK)
  userSignin(@Body() data: UserSigninDto): Promise<Tokens> {
    return this.authService.userSignin(data);
  }

  @Post('/user/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/user/refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }
}
