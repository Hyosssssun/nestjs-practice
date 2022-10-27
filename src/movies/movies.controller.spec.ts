import { INestApplication } from '@nestjs/common';
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
  await app.init();
});

it('should return empty list', async () => {
  const response = await request(app.getHttpServer()).get('/movies').send();
  expect(response.body).toEqual([]);
});

it('should return one movie in the list', async () => {
  await request(app.getHttpServer()).post('/movies').send({
    title: 'Harry Potter',
    year: 1922,
    genres: 'Fantasy',
  });
  const response = await request(app.getHttpServer()).get('/movies').send();
  console.log(response.body);
  expect(response.body).toHaveLength(1);
});
