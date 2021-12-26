export class JwtPayloadDto {
  sub: string;
  email: string;
  roleId: number;
  img: string;
  iat?: number;
  exp?: number;
}
