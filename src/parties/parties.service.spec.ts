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
        name: 'name1',
        imgUrl: 'http://url.jpg',
        capacity: 5,
      }),
      new Parties({
        id: 2,
        name: 'name2',
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
      name: 'This is name',
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

  it('should throw error if same user join joined party', () => {
    const user = new User({ id: 1, email: 'john@m.com', password: '1234' });
    const party = new Parties({
      id: 1,
      name: 'This is name',
      imgUrl: 'http://img.jpg',
      capacity: 5,
      partiesUsers: [],
    });
    jest
      .spyOn(partiesRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(party));
    jest
      .spyOn(partiesUsersService, 'createPartiesUsers')
      .mockImplementation(() => Promise.reject({ code: '23505' }));

    void expect(async () => service.join(user, 1)).rejects.toThrowError();
  });

  it('should throw error join service have an error', () => {
    const user = new User({ id: 1, email: 'john@m.com', password: '1234' });
    const party = new Parties({
      id: 1,
      name: 'This is name',
      imgUrl: 'http://img.jpg',
      capacity: 5,
      partiesUsers: [],
    });
    jest
      .spyOn(partiesRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(party));
    jest
      .spyOn(partiesUsersService, 'createPartiesUsers')
      .mockImplementation(() => Promise.reject({ message: 'Other errors' }));

    void expect(async () => service.join(user, 1)).rejects.toThrowError();
  });

  it('should exceed party capacity', async () => {
    const user = new User({ id: 1, email: 'john@m.com', password: '1234' });
    const party = new Parties({
      id: 1,
      name: 'This is name',
      imgUrl: 'http://img.jpg',
      capacity: 0,
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

    expect(await service.join(user, 1)).toBeNull();
  });

  it('should create party', async () => {
    const party = new Parties({
      id: 1,
      name: 'Party 1',
      capacity: 10,
      imgUrl: 'https://img.jpg',
      partiesUsers: [],
    });

    jest.spyOn(partiesRepository, 'create').mockImplementation(() => party);
    jest
      .spyOn(partiesRepository, 'save')
      .mockImplementation(() => Promise.resolve(party));
    expect(await service.create('Party 1', 10)).toBeDefined();
  });
});
