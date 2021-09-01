import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './../src/users/users.module';
import { UsersService } from 'src/users/users.service';


describe('Users ', () => {
  let app: INestApplication;
  let usersService = {findAll: () => ['test']};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
    .overrideProvider(UsersService)
    .useValue(UsersService)
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect({
        data: usersService.findAll(),
       });
  });

  it('gets user with id 4', () => {
    return request(app.getHttpServer())
      .get('/users/4')
      .expect(200)
  });

  it('delete user with id 4', () => {
    return request(app.getHttpServer())
      .delete('/users/delete/4')
      .expect(200)
  });

  it('creates new user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .expect(200)
  });

     afterAll(async () =>{
         await app.close()
     })
});
