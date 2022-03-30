import { InvalidContent } from './exceptions';
import { scorer } from './scorer';

describe('Scorer', () => {
  describe('Input handling', () => {
    test('should handle the 0 byte content', () => {
      const html = ``;
      const result = scorer(html);

      expect(result.score).toBeLessThan(0.0);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    test.each([1, null, true, false, undefined, {}, []])(
      'should throw on invalid content [%s]',
      value => {
        expect(() => scorer(value as unknown as string)).toThrow(
          InvalidContent,
        );
      },
    );
  });
});
