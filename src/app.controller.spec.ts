import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

describe('AppController', () => {
  let appService: AppService;
  let authService: AuthService;
  let appController: AppController;

  beforeEach(async () => {
    appService = new AppService();
    appController = new AppController(authService, appService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      jest
        .spyOn(appService, 'getHello')
        .mockImplementation(() => 'Hello World!');
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
