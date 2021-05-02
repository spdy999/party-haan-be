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

  // async join(user: User, party: Party): Promise<PartiesUsers> {
  //   const partiesUsers: PartiesUsers = PartiesUsers.create();
  //   partiesUsers.user = user;
  //   // partiesUsers.party = party;
  //   await PartiesUsers.save(partiesUsers);
  //   return partiesUsers;
  // }
}
