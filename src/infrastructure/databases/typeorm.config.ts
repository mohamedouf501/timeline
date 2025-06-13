import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const db = configService.getOrThrow('database');
  return {
    type: 'postgres',
    host: db.host,
    port: db.port,
    username: db.user,
    password: db.pass,
    database: db.name,
    entities: [__dirname + '/../../**/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../**/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: true,
  };
};
