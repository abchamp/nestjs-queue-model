import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MlWorkerModule } from './ml-worker/ml-worker.module';
import entities from './typeorm';
import { Logs } from './typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log(process.env);
        return {
          type:
            process.env.DB_MYSQL_TYPE ||
            configService.get<string>('DB_MYSQL_TYPE'),
          host:
            process.env.DB_MYSQL_HOST ||
            configService.get<string>('DB_MYSQL_HOST'),
          port:
            parseInt(process.env.DB_MYSQL_PORT) ||
            configService.get<number>('DB_MYSQL_PORT'),
          // host: 'localhost',
          // port: 3307,
          username:
            process.env.DB_MYSQL_USER ||
            configService.get<string>('DB_MYSQL_USER'),

          password:
            process.env.DB_MYSQL_PASS ||
            configService.get<string>('DB_MYSQL_PASS'),

          database:
            process.env.DB_MYSQL_DBNAME ||
            configService.get<string>('DB_MYSQL_DBNAME'),

          entities,
          synchronize: true,
          logger: 'advanced-console',
        } as TypeOrmModuleOptions;
      },
    }),
    TypeOrmModule.forFeature([Logs]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host:
            process.env.DB_REDIS_HOST ||
            configService.get<string>('DB_REDIS_HOST'),
          port:
            parseInt(process.env.DB_REDIS_PORT) ||
            configService.get<number>('DB_REDIS_PORT'),
        },
      }),
    }),
    MlWorkerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
