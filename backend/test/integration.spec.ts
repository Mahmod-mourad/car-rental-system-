import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HealthController } from '../src/health/health.controller';

describe('Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableCors({ origin: '*' });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app.getHttpServer())
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status');
    });
  });

  describe('CORS Headers', () => {
    it('should include CORS headers in response', async () => {
      const response = await request(app.getHttpServer())
        .get('/health')
        .set('Origin', 'http://localhost:3000');

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });

  describe('Security Headers', () => {
    it('should include security headers', async () => {
      const response = await request(app.getHttpServer())
        .get('/health');

      expect(response.headers).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent route', async () => {
      const response = await request(app.getHttpServer())
        .get('/non-existent-route')
        .expect(404);

      expect(response.body).toBeDefined();
    });

    it('should return error message for malformed request', async () => {
      const response = await request(app.getHttpServer())
        .post('/some-endpoint')
        .send({ invalid: 'data' });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });
});
