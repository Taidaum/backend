import * as Random from './random';

describe('Utils - Random', () => {
  describe('getRandomInt', () => {
    it('should return a valid random int', () => {
      const limit = 1000;
      const rounds = 500;
      for (let index = 0; index < rounds; index++) {
        const value = Random.getRandomInt(limit);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(limit);
      }
    });
  });
});
