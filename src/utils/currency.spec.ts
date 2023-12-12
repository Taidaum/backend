import * as Currency from './currency';

describe('Utils - Currency', () => {
  describe('getFunctionNames', () => {
    it('should match the expected format', () => {
      const realValue = Currency.formatCurrency(2, 'BRL');
      const usdValue = Currency.formatCurrency(3, 'USD');

      expect(realValue).toBeDefined();
      expect(realValue).toMatch('2,00');
      expect(usdValue).toBeDefined();
      expect(usdValue).toMatch('3,00');
    });
  });
});
