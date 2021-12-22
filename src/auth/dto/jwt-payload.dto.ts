export class JwtPayloadDto {
  sub: string;
  email: string;
  roleId: string;
  img: string;
  iat?: number;
  exp?: number;
}
