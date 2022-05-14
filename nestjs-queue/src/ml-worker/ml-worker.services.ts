import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as child from 'child_process';

@Injectable()
export class MLWorkerService {
  async runModel(fullImagePath) {

    // let modelName = `${process.env.PY_POND_MODEL_PATH}${name}.joblib`;
    // // check file exist
    // try {
    //   await fs.promises.access(modelName);
    // } catch (error) {
    //   console.log(error);
    //   return null;
    // }

    // const childPros = child.spawn(process.env.PYBASE_PATH, [
    //   process.env.PY_POND_SCRIPT_PATH, // env path
    //   modelName,
    //   fullImagePath,
    // ]);

    // let resp_data = "";
    // childPros.stdin.write(JSON.stringify(JSON.stringify(inputData)));
    // childPros.stdin.end();

    // for await (const chunk of childPros.stdout) {
    //   console.log("stdout chunk: " + chunk);
    //   resp_data += chunk;
    // }

    // let error = "";
    // for await (const chunk of childPros.stderr) {
    //   console.error("stderr chunk: " + chunk);
    //   error += chunk;
    // }

    // const exitCode = await new Promise((resolve, reject) => {
    //     childPros.on("close", resolve);
    // });

    // if (exitCode) {
    //   throw new Error(`subprocess error exit ${exitCode}, ${error}`);
    // }

    // return resp_data;
  }
  // call model
  

}
