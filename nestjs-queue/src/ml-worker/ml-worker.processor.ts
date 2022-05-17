import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
// consumer
import { MLWorkerService } from './ml-worker.services';
@Processor('ML_worker')
export class MLPWorkerConsumer {
  constructor(private readonly mlService: MLWorkerService) {}
  private readonly logger = new Logger(MLPWorkerConsumer.name);
  @Process('queuetest')
  async queuetest(job: Job<unknown>) {
    try {
      // call model
      this.logger.debug('Start transcoding...');
      this.logger.debug(job.data);
      await this.mlService.runModel(
        job.data['rawFileName'],
        job.data['rawFileExt'],
      );
      this.logger.debug('Transcoding completed');
    } catch (error) {
      console.log('error');
    }
  }
}
