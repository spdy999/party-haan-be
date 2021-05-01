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
    jwtService = new JwtService({});
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
            new User({ email: 'Peter', password: '1234', id: 1 }),
          ),
      );

    expect(await service.validateUser('Peter', '1234')).toEqual({
      email: 'Peter',
      id: 1,
    });
  });

  it('should not validateUser', async (done) => {
    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(
        (): Promise<User> =>
          Promise.resolve(
            new User({ email: 'Peter', password: '1234', id: 1 }),
          ),
      );

    expect(await service.validateUser('Peter', 'wrongPass')).toBeNull();
    done();
  });

  it('should login user', () => {
    jest
      .spyOn(jwtService, 'sign')
      .mockImplementation((): string => 'HelloWorld1234');

    const { access_token } = service.login(
      new User({ email: 'Peter', password: '1234' }),
    );

    expect(access_token).toBeDefined();
  });

  it('should signup user', async () => {
    jest
      .spyOn(userService, 'insert')
      .mockImplementation(
        (): Promise<User> =>
          Promise.resolve(
            new User({ email: 'Peter', password: '1234', id: 1 }),
          ),
      );
    expect(await service.signUp({ email: 'Peter', password: '1234' })).toEqual({
      email: 'Peter',
      password: '1234',
      id: 1,
    });
  });
});
