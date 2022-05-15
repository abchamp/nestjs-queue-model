import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { MlWorkerModule } from './ml-worker/ml-worker.module';
import entities from './typeorm';
import { Logs } from './typeorm';

@Module({
  // load config form docker
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      // host: 'localhost',
      // port: 3307,
      username: 'root',
      password: 'root',
      database: 'test_db',
      entities,
      synchronize: true,
      logger: 'advanced-console',
    }),
    TypeOrmModule.forFeature([Logs]),
    BullModule.forRoot({
      redis: {
        host: 'queue-db',
        port: 6379,
      },
    }),

    MlWorkerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
