import { PartiesUsersService } from './parties-users.service';
import { Repository } from 'typeorm';
import { PartiesUsers } from './parties-users.entity';

describe('PartiesUsersService', () => {
  let partiesUsersRepository: Repository<PartiesUsers>;
  let service: PartiesUsersService;

  beforeEach(() => {
    partiesUsersRepository = new Repository<PartiesUsers>();
    service = new PartiesUsersService(partiesUsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
