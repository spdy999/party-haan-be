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
      .then((res: { body: UserLoginDTO }) => {
        const { access_token, userId } = res.body;
        expect(access_token).not.toBeUndefined();
        expect(userId).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('/auth/login (POST 200)', (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'Peter', password: '1234' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res: { body: UserLoginDTO }) => {
        const { access_token, userId } = res.body;
        expect(access_token).not.toBeUndefined();
        expect(userId).not.toBeUndefined();
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

  it('/parties/join (POST 201)', async (done) => {
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
        const expectedPartiesUsers = {
          user: { email: 'Peter' },
          party: {
            name: 'This is name.',
            imgUrl:
              'https://i.pinimg.com/564x/58/b8/ac/58b8ac4c880c45848c034226e00e3ca2.jpg',
            capacity: 5,
            partiesUsers: [],
          },
        };

        expect(partiesUsers).toMatchObject(expectedPartiesUsers);
        done();
      });
  });

  it('/parties/join (POST 400)', async (done) => {
    const jwtService = new JwtService({
      secretOrPrivateKey: jwtConstants.secret,
    });
    const token = jwtService.sign({ email: 'Tony', id: 2 });
    return request(app.getHttpServer())
      .post('/parties/join')
      .auth(token, { type: 'bearer' })
      .send({ partyId: 2 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ message: 'No capacity', statusCode: 400 });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('/parties/join (POST 400 same user in same party)', async (done) => {
    const jwtService = new JwtService({
      secretOrPrivateKey: jwtConstants.secret,
    });
    const token = jwtService.sign({ email: 'Peter', id: 1 });
    return request(app.getHttpServer())
      .post('/parties/join')
      .auth(token, { type: 'bearer' })
      .send({ partyId: 3 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Can not join same party.',
          statusCode: 400,
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
