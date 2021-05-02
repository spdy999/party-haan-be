import { Repository } from 'typeorm';
import { Parties } from './Parties.entity';
import { PartiesService } from './Parties.service';
import { PartiesUsers } from 'src/parties-users/parties-users.entity';
import { PartiesUsersService } from 'src/parties-users/parties-users.service';
import { User } from 'src/users/user.entity';

describe('PartiesService', () => {
  let service: PartiesService;
  let partiesRepository: Repository<Parties>;
  let partiesUsersRepository: Repository<PartiesUsers>;
  let partiesUsersService: PartiesUsersService;

  beforeEach(() => {
    partiesRepository = new Repository<Parties>();
    partiesUsersRepository = new Repository<PartiesUsers>();
    partiesUsersService = new PartiesUsersService(partiesUsersRepository);
    service = new PartiesService(partiesRepository, partiesUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should findAll parties', async () => {
    const mockParties = [
      new Parties({
        id: 1,
        description: 'desc1',
        imgUrl: 'http://url.jpg',
        capacity: 5,
      }),
      new Parties({
        id: 2,
        description: 'desc1',
        imgUrl: 'http://url.jpg',
        capacity: 5,
      }),
    ];
    jest
      .spyOn(partiesRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockParties));

    expect(await service.findAll()).toEqual(mockParties);
  });

  it('should join party', async () => {
    const user = new User({ id: 1, email: 'john@m.com', password: '1234' });
    const party = new Parties({
      id: 1,
      description: 'This is description',
      imgUrl: 'http://img.jpg',
      capacity: 5,
      partiesUsers: [],
    });
    jest
      .spyOn(partiesRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(party));
    jest
      .spyOn(partiesUsersService, 'createPartiesUsers')
      .mockImplementation(() =>
        Promise.resolve(new PartiesUsers({ id: 1, party, user })),
      );

    expect(await service.join(user, 1)).toBeDefined();
  });
});
