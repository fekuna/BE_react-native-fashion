import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserSigninDto, UserSignupDto } from './dto';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async userSignup(data: UserSignupDto): Promise<Tokens> {
    const { email, name, password, roleId } = data;

    const hash = await this.hashData(password);

    const newUser = await this.userService.userCreate(
      {
        email: email,
        name: name,
        hashPassword: hash,
      },
      roleId,
    );

    console.log('authService:', newUser);

    const tokens = await this.getTokens({
      sub: newUser.id,
      name: newUser.name,
      email: newUser.email,
      roleId: roleId,
      img: newUser.img,
      address: newUser.address,
    });
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async userSignin(data: UserSigninDto): Promise<Tokens> {
    const user = await this.userService.getUserBy({
      email: data.email,
      relations: ['role'],
      forLogin: true,
    });

    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches)
      throw new ForbiddenException('Incorrect Email or Password');

    const tokens = await this.getTokens({
      sub: user.id,
      name: user.name,
      email: user.email,
      roleId: user.role.id,
      img: user.img,
      address: user.address,
    });
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    await this.userService.userUpdate(userId, { rt_hash: null });
  }

  async refreshToken(userId: string, rt: string) {
    const user = await this.userService.getUserBy({
      id: userId,
      relations: ['role'],
    });

    if (!user.rt_hash) throw new ForbiddenException('Access denied');

    const rtMatches = await bcrypt.compare(rt, user.rt_hash);
    if (!rtMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens({
      sub: user.id,
      name: user.name,
      email: user.email,
      roleId: user.role.id,
      img: user.img,
      address: user.address,
    });
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  // ================= MISC =================

  async updateRtHash(userId: string, rt: string) {
    console.log('updateRtHash');
    const hash = await this.hashData(rt);
    await this.userService.userUpdate(userId, { rt_hash: hash });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens({
    sub,
    email,
    roleId,
    img,
    name,
    address,
  }: JwtPayloadDto): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub,
          name,
          email,
          roleId,
          img,
          address,
        },
        {
          secret: this.config.get<string>('AT_SECRET'),
          expiresIn: 60 * 60,
          // expiresIn: 10 * 1,
        },
      ),
      this.jwtService.signAsync(
        {
          sub,
          name,
          email,
          roleId,
          img,
          address,
        },
        {
          secret: this.config.get<string>('RT_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
          // expiresIn: 20 * 1,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
