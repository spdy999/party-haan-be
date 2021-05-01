import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should getHello', () => {
    expect(service.getHello()).toEqual('Hello World!');
  });
});
