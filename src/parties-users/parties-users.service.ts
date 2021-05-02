import { Injectable } from '@nestjs/common';
import { PartiesUsers } from './parties-users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Parties } from 'src/parties/parties.entity';

@Injectable()
export class PartiesUsersService {
  constructor(
    @InjectRepository(PartiesUsers)
    private readonly partiesUsersRepository: Repository<PartiesUsers>,
  ) {}

  async createPartiesUsers(user: User, party: Parties): Promise<PartiesUsers> {
    const partiesUsers: PartiesUsers = this.partiesUsersRepository.create();
    partiesUsers.user = user;
    partiesUsers.party = party;
    return this.partiesUsersRepository.save(partiesUsers);
  }
}
