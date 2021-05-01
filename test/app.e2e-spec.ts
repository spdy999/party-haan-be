import { TestUtils } from './test.utils';
import { Test } from '@nestjs/testing';

import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { DatabaseService } from '../src/database/database.service';
import { DatabaseModule } from '../src/database';
import * as request from 'supertest';
import UserLoginDTO from 'src/users/dto/user-login.dto';

describe('AppController (e2e)', () => {
  let testUtils: TestUtils;
  let app: INestApplication;

  beforeEach(async (done) => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, AppModule],
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

  it('/ (GET)', () => {
    expect(1).toEqual(1);
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/signup (POST 201)', (done) => {
    const testUserName = 'JohnDoe101';
    const testPassword = 'ImJohn101';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username: testUserName, password: testPassword })
      .expect(201)
      .expect({}, done);
  });

  it('/auth/login (POST 200)', (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'Peter', password: '1234' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res: { body: UserLoginDTO }) => {
        expect(res.body.access_token).not.toBeUndefined();
        done();
      });
  });
});
