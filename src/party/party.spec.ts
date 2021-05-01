import { Party } from './party.entity';

describe('Party', () => {
  it('should be defined', () => {
    expect(new Party()).toBeDefined();
  });
});
