import { HttpException, Injectable } from '@nestjs/common';
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

  async findOneWithPartiesUsers(id: number): Promise<Parties> {
    return this.partiesRepository.findOne(id, { relations: ['partiesUsers'] });
  }

  async findAll(): Promise<Parties[]> {
    return this.partiesRepository.find({
      relations: ['partiesUsers'],
    });
  }

  hasCapacity(partyWithPartiesUsers: Parties): boolean {
    const { capacity, partiesUsers } = partyWithPartiesUsers;
    return capacity > partiesUsers.length;
  }

  async join(user: User, partyId: number): Promise<PartiesUsers | null> {
    const party = await this.findOneWithPartiesUsers(partyId);

    if (this.hasCapacity(party)) {
      return await this.partiesUsersService.createPartiesUsers(user, party);
    }
    return null;
  }
}
