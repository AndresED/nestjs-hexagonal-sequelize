import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { getEnvFilePath } from './config/enviroments';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath()
    }),
    DatabaseModule,
    HttpModule,
    ScheduleModule.forRoot(),
    SendGridModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        apiKey: config.get<string>('SENGRIDAPIKEY'),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../uploads'),
    }),
    SharedModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
