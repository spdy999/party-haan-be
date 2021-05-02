import { PartiesUsersService } from './parties-users.service';
import { Repository } from 'typeorm';
import { PartiesUsers } from './parties-users.entity';
import { User } from 'src/users/user.entity';
import { Parties } from 'src/parties/parties.entity';

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

  it('should createPartiesUsers', async () => {
    const user = new User({ id: 1, email: 'john@m.com', password: '1234' });
    const party = new Parties({
      id: 1,
      description: 'This is description',
      imgUrl: 'http://img.jpg',
      capacity: 5,
    });
    jest
      .spyOn(partiesUsersRepository, 'create')
      .mockImplementation(() => new PartiesUsers());
    jest
      .spyOn(partiesUsersRepository, 'save')
      .mockImplementation(() =>
        Promise.resolve(new PartiesUsers({ id: 1, user, party })),
      );

    expect(await service.createPartiesUsers(user, party)).toBeDefined();
  });
});
