import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { config } from '../environments/app.environment';

const _typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [config.KEY],
  useFactory: async (
    env: ConfigType<typeof config>,
  ): Promise<TypeOrmModuleOptions> => {
    const { database } = env;

    // console.log('database config ===========', database);
    return {
      type: database.type as 'mysql' | 'postgres',
      host: database.host,
      port: Number(database.port || 3306),
      username: database.user,
      password: database.password,
      database: database.database,
      entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/migrations',
      },
      extra: {
        charset: 'utf8_general_ci',
      },
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
    };
  },
};

@Module({
  imports: [TypeOrmModule.forRootAsync(_typeOrmAsyncConfig)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
