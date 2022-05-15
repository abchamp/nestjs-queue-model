import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Logs } from './typeorm/';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Logs)
    private readonly logsRepository: Repository<Logs>,
  ) {}
  // call model
  create(): Promise<Logs> {
    return this.logsRepository.save({
      desc: 'test',
    });
  }

  async findAll(): Promise<Logs[]> {
    return this.logsRepository.find();
  }
}
