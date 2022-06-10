import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogisticModule } from './modules/logistic/logistic.module';
import { CredentialModule } from './modules/credential/credential.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import appEnvironment from './environments/app.environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appEnvironment],
      envFilePath: '.env',
    }),
    LogisticModule,
    CredentialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  static mode: string;

  constructor(private _configsvc: ConfigService) {
    AppModule.port = this._configsvc.get('port');
    AppModule.mode = this._configsvc.get('mode');
  }
}
