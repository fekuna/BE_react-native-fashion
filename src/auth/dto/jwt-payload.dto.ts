export class JwtPayloadDto {
  sub: string;
  name: string;
  email: string;
  roleId: number;
  img: string;
  address: string;
  iat?: number;
  exp?: number;
}
