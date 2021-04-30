import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    service = new UsersService(userRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
