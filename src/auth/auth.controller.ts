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
  @Post('/auth/signup')
  userSignup(@Body() data: UserSignupDto): Promise<Tokens> {
    return this.authService.userSignup(data);
  }

  @Public()
  @Post('/auth/signin')
  @HttpCode(HttpStatus.OK)
  userSignin(@Body() data: UserSigninDto): Promise<Tokens> {
    console.log('Auth Signin');
    return this.authService.userSignin(data);
  }

  @Post('/auth/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/auth/refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }

  // =========================== SELLER ROUTES ========================
  @Public()
  @Post('/seller/signup')
  sellerSignup(@Body() data: UserSignupDto): Promise<Tokens> {
    return this.authService.userSignup(data);
  }
}
