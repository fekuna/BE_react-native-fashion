export class JwtPayloadDto {
  sub: string;
  name: string;
  email: string;
  roleId: number;
  img: string;
  iat?: number;
  exp?: number;
}
