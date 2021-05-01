import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(() => {
    userRepository = new Repository<User>();
    service = new UsersService(userRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should findOne user', () => {
    jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
      return Promise.resolve(
        new User({
          email: 'Peter',
          password: '1234',
          id: 1,
        }),
      );
    });
    expect(service.findOne('Peter')).toBeDefined();
  });

  it('should insert user', async () => {
    jest.spyOn(userRepository, 'create').mockImplementation(
      (): User => {
        return new User();
      },
    );
    jest.spyOn(userRepository, 'save').mockImplementation(() => {
      return Promise.resolve(
        new User({
          email: 'Peter',
          password: '1234',
          id: 1,
        }),
      );
    });
    const user = await service.insert({ email: 'Peter', password: '1234' });
    expect(user).toEqual(
      new User({
        email: 'Peter',
        password: '1234',
      }),
    );
  });
});
