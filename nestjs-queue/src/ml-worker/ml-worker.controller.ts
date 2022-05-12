import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { Queue } from 'bull';

// import { multerOptions } from 'src/utils/customMulter';
// import { successResp, errorResp } from 'src/utils/response_handler';
// import { FileInterceptor } from '@nestjs/platform-express';

// producer
// create task to add queue
@Controller('mlworker')
export class MlWorkerController {
  constructor(@InjectQueue('ML_worker') private readonly mlWorker: Queue) {}
  // upload ml woker
  @Post('add-queue')
  // @UseInterceptors(FileInterceptor('file', multerOptions))
  async transcode() {
    try {
      console.log('in');
      await this.mlWorker.add(
        'queuetest',
        {
          fileName: 'fllename test',
          path: 'path-test',
          ts: new Date(),
        },
        {
          delay: 3000,
          timeout: 10000,
        },
      );
      return 'Create Queue';
    } catch (error) {
      return error;
    }
  }
}
