import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Logs } from './typeorm/';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getLogs(): Promise<Logs[]> {
    return this.appService.findAll();
  }
  //
  @Post()
  createLog() {
    return this.appService.create();
  }
}

//https://github.com/HugoDF/node-run-python/blob/master/run.js
