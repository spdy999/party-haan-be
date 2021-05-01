import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(() => {
    userRepository = new Repository<User>();
    userService = new UsersService(userRepository);
    service = new AuthService(userService, jwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validateUser', async () => {
    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(
        (): Promise<User> =>
          Promise.resolve(
            new User({ username: 'Peter', password: '1234', id: 1 }),
          ),
      );

    expect(await service.validateUser('Peter', '1234')).toEqual({
      username: 'Peter',
      id: 1,
    });
  });

  // it('should not validateUser', () => {});
});
