import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserSigninDto, UserSignupDto } from './dto';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async userSignup(data: UserSignupDto): Promise<Tokens> {
    const hash = await this.hashData(data.password);

    const newUser = await this.userService.userCreate({
      email: data.email,
      name: data.name,
      hashPassword: hash,
      role: 1,
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role.id,
    );
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async userSignin(data: UserSigninDto): Promise<Tokens> {
    const user = await this.userService.getUserBy({ email: data.email });

    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches)
      throw new ForbiddenException('Incorrect Email or Password');

    const tokens = await this.getTokens(user.id, user.email, user.role.id);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    await this.userService.userUpdate(userId, { rt_hash: null });
  }

  async refreshToken(userId: string, rt: string) {
    const user = await this.userService.getUserBy({
      id: userId,
    });

    if (!user.rt_hash) throw new ForbiddenException('Access denied');

    const rtMatches = await bcrypt.compare(rt, user.rt_hash);
    if (!rtMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email, user.role.id);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  // ================= MISC =================

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.userService.userUpdate(userId, { rt_hash: hash });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(
    userId: string,
    email: string,
    role: number,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.config.get<string>('AT_SECRET'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.config.get<string>('RT_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
