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
  const req = await request(app.getHttpServer())
    .post('/movies')
    .send({
      title: 'Harry Potter',
      year: 1922,
      genres: ['Fantasy'],
    });
  expect(req.statusCode).toBe(201);

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

it('should return bad request error message when it gets wrong type of title', async () => {
  const req = await request(app.getHttpServer())
    .post('/movies')
    .send({
      title: 232434,
      year: 1993,
      genres: ['Action'],
    });

  expect(req.statusCode).toBe(400);
});
it('should return bad request error message when it gets wrong type of genres', async () => {
  const req = await request(app.getHttpServer())
    .post('/movies')
    .send({
      title: '232434',
      year: 1993,
      genres: [1234],
    });

  expect(req.statusCode).toBe(400);
});

it('should return bad request error when there is wrong param passed', async () => {
  const req = await request(app.getHttpServer())
    .patch('/movies/hi')
    .send({
      title: 'newName',
      year: 2022,
      genres: ['Action'],
    });

  expect(req.statusCode).toBe(400);
});

it('should return updated movie in the list', async () => {
  const req = await request(app.getHttpServer())
    .patch('/movies/1')
    .send({
      title: 'newName',
      year: 2022,
      genres: ['Action'],
    });

  expect(req.statusCode).toBe(200);

  const expected = {
    id: 1,
    title: 'newName',
    year: 2022,
    genres: ['Action'],
  };

  const res = await request(app.getHttpServer()).get('/movies/1').send();

  expect(res.body).toEqual(expected);
});

it('should return empty list after deleting the movie', async () => {
  const req = await request(app.getHttpServer()).delete('/movies/1').send();
  expect(req.statusCode).toBe(200);
  const res = await request(app.getHttpServer()).get('/movies').send();
  expect(res.body).toEqual([]);
});
