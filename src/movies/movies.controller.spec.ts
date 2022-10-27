import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';

const testingModule = Test.createTestingModule({
  imports: [AppModule],
});

let app: INestApplication;

beforeAll(async () => {
  const module = await testingModule.compile();
  app = await module.createNestApplication();
  await app.init();
});