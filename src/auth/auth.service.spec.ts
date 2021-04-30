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

  beforeEach(async () => {
    userService = new UsersService(userRepository);
    service = new AuthService(userService, jwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
