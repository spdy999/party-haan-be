import { TestUtils } from './test.utils';
import { Test } from '@nestjs/testing';

import { AppModule } from 'src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import UserLoginDTO from 'src/users/dto/user-login.dto';
import { User } from 'src/users/user.entity';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../src/auth/constants';
import { PartiesUsers } from '../src/parties-users/parties-users.entity';
import { Parties } from 'src/parties/parties.entity';

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

  it('/profile (POST 200)', async (done) => {
    const jwtService = new JwtService({
      secretOrPrivateKey: jwtConstants.secret,
    });
    const access_token = jwtService.sign({ email: 'Peter', id: 1 });
    return request(app.getHttpServer())
      .get('/profile')
      .auth(access_token, { type: 'bearer' })
      .expect(200)
      .then((resp: { body: User }) => {
        const user = resp.body;
        expect(user).toEqual({ email: 'Peter', id: 1 });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('/parties/join (POST)', (done) => {
    const jwtService = new JwtService({
      secretOrPrivateKey: jwtConstants.secret,
    });
    const token = jwtService.sign({ email: 'Peter', id: 1 });
    return request(app.getHttpServer())
      .post('/parties/join')
      .auth(token, { type: 'bearer' })
      .send({ partyId: 1 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res: { body: PartiesUsers }) => {
        const partiesUsers = res.body;
        const expectedUser = new User({
          id: 1,
          email: 'Peter',
        });
        const expectedParty = new Parties({
          id: 1,
          description: 'This is description.',
          imgUrl:
            'https://i.pinimg.com/564x/58/b8/ac/58b8ac4c880c45848c034226e00e3ca2.jpg',
          capacity: 5,
        });
        const expectedPartiesUsers = new PartiesUsers({
          id: 1,
          user: expectedUser,
          party: expectedParty,
        });
        expect(partiesUsers).toEqual(expectedPartiesUsers);
        done();
      });
    // .expect(1, done);
  });
});
