import { Injectable } from '@nestjs/common';
import * as fse from 'fs-extra';
import * as child from 'child_process';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MLWorkerService {
  constructor(private configService: ConfigService) {}
  async runModel(rawFileName, rawFileExt) {
    let _pythonScriptPath =
      process.env.PYPHON_SCRIPT_PATH ||
      this.configService.get<string>('PYPHON_SCRIPT_PATH');
    let _pythonModelPath =
      process.env.PYPHON_MODEL_PATH ||
      this.configService.get<string>('PYPHON_MODEL_PATH');
    let _rawDataDir =
      process.env.RAW_DATA_UPLOADS_DIR ||
      this.configService.get<string>('RAW_DATA_UPLOADS_DIR');
    let _testingDataDir =
      process.env.TESTING_DATA_UPLOADS_DIR ||
      this.configService.get<string>('TESTING_DATA_UPLOADS_DIR');
    // copy image to directory
    // php:/uploads/raw_data/abcdefg.jpg to nestjs:/uploads/test_input/all_classes/1.jpg
    //
    try {
      console.log(__dirname)
      let _mainTestingFile = `${_testingDataDir}test.${rawFileExt}`;
      // await fse.ensureFile(`${_rawDataDir}${rawFileName}`);
      await fse.copy(
        `${_rawDataDir}/${rawFileName}.${rawFileExt}`,
        _mainTestingFile,
      );

      const childPros = child.spawn(_pythonScriptPath, [
        _pythonModelPath, // python script
        _mainTestingFile,
      ]);
      let resp_data = '';
      // childPros.stdin.write(JSON.stringify(JSON.stringify(inputData)));
      // childPros.stdin.end();
      for await (const chunk of childPros.stdout) {
        console.log('stdout chunk: ' + chunk);
        resp_data += chunk;
      }
      let error = '';
      for await (const chunk of childPros.stderr) {
        console.error('stderr chunk: ' + chunk);
        error += chunk;
      }
      const exitCode = await new Promise((resolve, reject) => {
        childPros.on('close', resolve);
      });
      if (exitCode) {
        throw new Error(`subprocess error exit ${exitCode}, ${error}`);
      }
      //
      // clear on directory
      await fse.remove(_mainTestingFile)
      //
      console.log(resp_data);
      return resp_data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
