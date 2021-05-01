import { TestUtils } from './test.utils';
import { Test } from '@nestjs/testing';

import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { DatabaseService } from '../src/database/database.service';
import { DatabaseModule } from '../src/database';
import { UserRepository } from '../src/users/user.repository';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  // let userRepository: UserRepository;
  let testUtils: TestUtils;
  let app: INestApplication;

  beforeEach(async (done) => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, AppModule],
      providers: [DatabaseService, TestUtils],
    }).compile();
    testUtils = module.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
    // userRepository = testUtils.databaseService.connection.getCustomRepository(
    //   UserRepository,
    // );

    // const moduleFixture = await Test.createTestingModule({
    //   imports: [AppModule],
    // }).compile();

    // app = moduleFixture.createNestApplication();
    // await app.init();

    app = module.createNestApplication();
    await app.init();
    done();
  });

  afterEach(async (done) => {
    await testUtils.closeDbConnection();
    done();
  });

  // beforeAll(async () => {
  //   const moduleFixture = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  it('/ (GET)', () => {
    expect(1).toEqual(1);
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
