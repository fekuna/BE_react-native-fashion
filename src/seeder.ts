import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSeeder } from './seeders/user.seeder';
import { User } from './user/entities/user.entity';

console.log('hehe');
seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'rn_fashion',
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
}).run([UserSeeder]);
