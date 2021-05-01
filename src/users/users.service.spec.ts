import { Repository } from 'typeorm';
import { User } from './user.entity';
// import { UserRepository } from './user.repository';
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

  it('should findOne', () => {
    jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
      return Promise.resolve(
        new User({
          username: 'Peter',
          password: '1234',
          id: 1,
        }),
      );
    });
    expect(service.findOne('Peter')).toBeDefined();
  });
});
