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
