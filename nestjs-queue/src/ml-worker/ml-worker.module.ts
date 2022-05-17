import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MlWorkerController } from './ml-worker.controller';
import { MLPWorkerConsumer } from './ml-worker.processor';
import { ConfigModule } from '@nestjs/config';
import { MLWorkerService } from './ml-worker.services';
@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue({
      name: 'ML_worker',
    }),
  ],
  controllers: [MlWorkerController],
  providers: [MLPWorkerConsumer, MLWorkerService],
})
export class MlWorkerModule {}
