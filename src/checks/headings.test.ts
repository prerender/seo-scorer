import { scorer } from '../scorer';
import { check_headings } from './headings.check';

describe('Headings Test', () => {
  test.each([
    ['h0', false],
    ['h1', true],
    ['h2', true],
    ['h3', true],
    ['h4', true],
    ['h5', true],
    ['h6', true],
    ['h7', false],
  ])('should match <%s> element as %s', (level, shouldBeValid) => {
    const html = `<html><body><${level}></${level}></body></html>`;
    const result = scorer(html, [check_headings]);

    if (shouldBeValid) {
      expect(result.score).toBeGreaterThan(0);
    } else {
      expect(result.score).toBeLessThan(0);
      expect(result.recommendations.length).toBeGreaterThan(0);
    }
  });

  test('should descore the missing h{1,6} element', () => {
    const html = `<html></html>`;
    const result = scorer(html, [check_headings]);

    expect(result.score).toBeLessThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  describe('H1', () => {
    test.each([
      [0, false],
      [1, true],
      [2, true],
      [3, true],
      [4, false],
      [8, false],
    ])(
      'should appreciate %dx <h1> element as %s',
      (times, shouldBePositive) => {
        const html = `<html><body>${`<h1>Test</h1>`.repeat(
          times,
        )}</body></html>`;
        const result = scorer(html, [check_headings]);

        if (shouldBePositive) {
          expect(result.score).toBeGreaterThan(0);
          expect(result.recommendations.length).toBe(0);
        } else {
          expect(result.score).toBeLessThan(0);
          expect(result.recommendations.length).toBeGreaterThan(0);
        }
      },
    );
  });
});
