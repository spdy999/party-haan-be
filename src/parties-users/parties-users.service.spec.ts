import { Test, TestingModule } from '@nestjs/testing';
import { PartiesUsersService } from './parties-users.service';

describe('PartiesUsersService', () => {
  let service: PartiesUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartiesUsersService],
    }).compile();

    service = module.get<PartiesUsersService>(PartiesUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
