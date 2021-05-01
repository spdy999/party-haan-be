import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../src/database';
import { DatabaseService } from '../src/database/database.service';
import * as request from 'supertest';
import { TestUtils } from './test.utils';
import { PartyModule } from '../src/party/party.module';

describe('PartyController (e2e)', () => {
  let testUtils: TestUtils;
  let app: INestApplication;

  beforeEach(async (done) => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, PartyModule],
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

  it('/party (GET)', (done) => {
    return request(app.getHttpServer()).get('/party').expect(200, done);
  });
});
