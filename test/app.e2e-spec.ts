import { TestUtils } from './test.utils';
import { Test } from '@nestjs/testing';

import { AppModule } from 'src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import UserLoginDTO from 'src/users/dto/user-login.dto';
import { User } from 'src/users/user.entity';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

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
      .send({ email: testUserName, password: testPassword })
      .expect(201)
      .expect({}, done);
  });

  it('/auth/login (POST 200)', (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'Peter', password: '1234' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res: { body: UserLoginDTO }) => {
        const { access_token } = res.body;
        expect(access_token).not.toBeUndefined();

        return request(app.getHttpServer())
          .get('/profile')
          .auth(res.body.access_token, { type: 'bearer' })
          .expect(200)
          .then((resp_2: { body: User }) => {
            const user = resp_2.body;
            expect(user).toEqual({ email: 'Peter', id: 1 });
            done();
          })
          .catch((err) => {
            done(err);
          });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('/auth/login (POST 401)', (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'Peter', password: '12345' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});
