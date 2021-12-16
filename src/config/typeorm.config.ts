import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'rn_fashion',
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};
