import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as request from 'supertest';

const testingModule = Test.createTestingModule({
  imports: [AppModule],
});

let app: INestApplication;

beforeAll(async () => {
  const module = await testingModule.compile();
  app = await module.createNestApplication();
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   }),
  // );
  await app.init();
});

it('should return empty list', async () => {
  const response = await request(app.getHttpServer()).get('/movies').send();
  expect(response.body).toEqual([]);
});

it('should return one movie in the list', async () => {
  await request(app.getHttpServer())
    .post('/movies')
    .send({
      title: 'Harry Potter',
      year: 1922,
      genres: ['Fantasy'],
    });
  const expected = [
    {
      id: 1,
      title: 'Harry Potter',
      year: 1922,
      genres: ['Fantasy'],
    },
  ];
  const response = await request(app.getHttpServer()).get('/movies').send();
  console.log(response.body);
  expect(response.body).toHaveLength(1);
  expect(response.body).toEqual(expected);
});

it('should return bad request error message', async () => {
  const req = await request(app.getHttpServer())
    .post('/movies')
    .send({
      title: 232434,
      year: 1993,
      genres: ['Action'],
    });

  expect(req.statusCode).toBe(400);
});
it('should return bad request error message', async () => {
  const req = await request(app.getHttpServer())
    .post('/movies')
    .send({
      title: '232434',
      year: 1993,
      genres: [1234],
    });

  expect(req.statusCode).toBe(400);
});
