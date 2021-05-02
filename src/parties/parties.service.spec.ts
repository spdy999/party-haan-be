import { Repository } from 'typeorm';
import { Parties } from './Parties.entity';
import { PartiesService } from './Parties.service';

describe('PartiesService', () => {
  let service: PartiesService;
  let partiesRepository: Repository<Parties>;

  beforeEach(() => {
    partiesRepository = new Repository<Parties>();
    service = new PartiesService(partiesRepository);
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
});
