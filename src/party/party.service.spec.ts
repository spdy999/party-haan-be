import { Repository } from 'typeorm';
import { Party } from './party.entity';
import { PartyService } from './party.service';

describe('PartyService', () => {
  let service: PartyService;
  let partyRepository: Repository<Party>;

  beforeEach(() => {
    partyRepository = new Repository<Party>();
    service = new PartyService(partyRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should findAll parties', async () => {
    const mockParties = [
      new Party({
        id: 1,
        description: 'desc1',
        imgUrl: 'http://url.jpg',
        capacity: 5,
      }),
      new Party({
        id: 2,
        description: 'desc1',
        imgUrl: 'http://url.jpg',
        capacity: 5,
      }),
    ];
    jest
      .spyOn(partyRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockParties));

    expect(await service.findAll()).toEqual(mockParties);
  });
});
