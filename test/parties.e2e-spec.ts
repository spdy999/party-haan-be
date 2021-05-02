import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../src/database/database.module';
import { DatabaseService } from '../src/database/database.service';
import * as request from 'supertest';
import { TestUtils } from './test.utils';
import { PartiesModule } from '../src/parties/parties.module';

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

  it('/parties (GET)', (done) => {
    return request(app.getHttpServer()).get('/parties').expect(200, done);
  });
});
