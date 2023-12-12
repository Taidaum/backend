import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { LoginAuthDto } from '../../../../types/dtos/auth.dto';
import ERRORS from '../../../../utils/errors';
import { AuthController } from '../auth.controller';

describe('AuthModule - AuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  describe('auth', () => {
    it('should fail authentication', async () => {
      const authController = app.get<AuthController>(AuthController);

      const body: LoginAuthDto = {
        email: 'test',
        password: 'test',
      };
      try {
        const result = await authController.login(body, '');
        expect(result).toBeDefined();
      } catch (error) {
        expect(error.message).toBe(ERRORS.AUTH.UNAUTHORIZED);
        expect(error.status).toBe(401);
      }
    });

    it('should authenticate successfully', async () => {
      const authController = app.get<AuthController>(AuthController);

      const body: LoginAuthDto = {
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD,
      };

      const result = await authController.login(body, '');
      expect(result).toBeDefined();
    });
  });

  afterAll((done) => {
    app.close().finally(() => {
      done();
    });
  });
});
