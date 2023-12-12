import * as Metadata from './metadata';

describe('Utils - Metadata', () => {
  describe('getFunctionNames', () => {
    it('should be defined', () => {
      const object = {
        testFn: function () {
          return 1;
        },
        randomProperty: 1,
        anotherFn: () => {
          return false;
        },
      };
      const names = Metadata.getFunctionNames(object);
      expect(names).toBeDefined();
    });
  });
});
