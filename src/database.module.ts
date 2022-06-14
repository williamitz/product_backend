import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { config } from './environments/app.environment';

// const _typeOrmConfig: TypeOrmModuleOptions = {
//   type: process.env.DB_TYPE as 'mysql' | 'postgres',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT) || 3306,
//   username: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
//   migrations: [__dirname + '/migrations/*{.ts,.js}'],
//   // cli: {
//   //   migrationsDir: __dirname + '/migrations',
//   // },
//   extra: {
//     charset: 'utf8_general_ci',
//   },
//   logging: true,
// };

const _typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [config.KEY],
  useFactory: async (
    env: ConfigType<typeof config>,
  ): Promise<TypeOrmModuleOptions> => {
    const { database } = env;

    console.log('database config ===========', database);
    return {
      type: database.type as 'mysql' | 'postgres',
      host: database.host,
      port: Number(database.port || 3306),
      username: database.user,
      password: database.password,
      database: database.database,
      // entities: [__dirname + './modules/**/*.entity.{ts,js}'],
      // migrations: [__dirname + '/migrations/*{.ts,.js}'],
      // synchronize: false,
      logging: true,
      // autoLoadEntities: true,
    };
  },
};

@Module({
  imports: [TypeOrmModule.forRootAsync(_typeOrmAsyncConfig)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
