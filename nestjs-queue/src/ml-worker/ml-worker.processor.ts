import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import * as fse from 'fs-extra';
// consumer
@Processor('ML_worker')
export class MLPWorkerConsumer {
  private readonly logger = new Logger(MLPWorkerConsumer.name);
  @Process('queuetest')
  async queuetest(job: Job<unknown>) {
    try {
      // copy file to test_data
      // must absolute path
    //   await fse.copy(job.data['fileLocation'], '');
      // call model
      this.logger.debug('Start transcoding...');
      this.logger.debug(job.data);
      this.logger.debug('Transcoding completed');
    } catch (error) {}
  }
}
