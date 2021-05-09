import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import * as request from 'supertest';
import { TestUtils } from './test.utils';
import { PartiesModule } from 'src/parties/parties.module';

describe('PartiesController (e2e)', () => {
  let testUtils: TestUtils;
  let app: INestApplication;

  beforeEach(async (done) => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, PartiesModule],
      providers: [DatabaseService, TestUtils],
    }).compile();
    testUtils = module.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();

    app = module.createNestApplication();
    await app.init();
    done();
  });

  afterEach(async (done) => {
    await testUtils.closeDbConnection();
    done();
  });

  it('/parties (GET)', async (done) => {
    return request(app.getHttpServer())
      .get('/parties')
      .expect(200)
      .then((resp) => {
        const expectedParties = [
          {
            id: 1,
            name: 'This is name.',
            imgUrl:
              'https://i.pinimg.com/564x/58/b8/ac/58b8ac4c880c45848c034226e00e3ca2.jpg',
            capacity: 5,
            partiesUsers: [],
          },
          {
            id: 2,
            name: 'Only 1 capacity',
            imgUrl:
              'https://i.pinimg.com/564x/58/b8/ac/58b8ac4c880c45848c034226e00e3ca2.jpg',
            capacity: 1,
            partiesUsers: [{ id: 1, partyId: 2, userId: 1 }],
          },
          {
            id: 3,
            name: 'Test duplicate user',
            imgUrl:
              'https://i.pinimg.com/564x/58/b8/ac/58b8ac4c880c45848c034226e00e3ca2.jpg',
            capacity: 3,
            partiesUsers: [{ id: 2, partyId: 3, userId: 1 }],
          },
        ];
        expect(resp.body).toEqual(expectedParties);
        done();
      });
  });

  it('/parties (POST 201)', async (done) => {
    return request(app.getHttpServer())
      .post('/parties')
      .send({ name: 'Create Party 1', capacity: 11 })
      .expect(201)
      .then((res) => {
        const expectedParty = {
          name: 'Create Party 1',
          capacity: 11,
        };
        expect(res.body).toMatchObject(expectedParty);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
