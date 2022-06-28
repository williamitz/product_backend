import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogisticModule } from './modules/logistic/logistic.module';
// import { CredentialModule } from './modules/credential/credential.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { config } from './environments/app.environment';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: '.env',
    }),

    DatabaseModule,
    LogisticModule,
    // CredentialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  static mode: string;
  static appname: string;

  constructor(private _configsvc: ConfigService) {
    AppModule.port = this._configsvc.get('SERVER_PORT');
    AppModule.mode = this._configsvc.get('SERVER_MODE');
    AppModule.appname = this._configsvc.get('APP_NAME');
  }
}
