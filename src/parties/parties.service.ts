import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartiesUsers } from 'src/parties-users/parties-users.entity';
import { PartiesUsersService } from 'src/parties-users/parties-users.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Parties } from './parties.entity';

@Injectable()
export class PartiesService {
  constructor(
    @InjectRepository(Parties)
    private partiesRepository: Repository<Parties>,
    private partiesUsersService: PartiesUsersService,
  ) {}
  async findAll(): Promise<Parties[]> {
    return this.partiesRepository.find();
  }

  async join(user: User, party: Parties): Promise<PartiesUsers> {
    return this.partiesUsersService.createPartiesUsers(user, party);
  }
}
