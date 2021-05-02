import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parties } from './parties.entity';

@Injectable()
export class PartiesService {
  constructor(
    @InjectRepository(Parties)
    private partiesRepository: Repository<Parties>,
  ) {}
  async findAll(): Promise<Parties[]> {
    return this.partiesRepository.find();
  }
}
