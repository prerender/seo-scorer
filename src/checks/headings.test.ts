import { load } from 'cheerio';
import { check_headings } from './headings.check';

describe('Headings Test', () => {
  test.each([
    [0, false],
    [1, true],
    [2, true],
    [3, true],
    [4, true],
    [5, true],
    [6, true],
    [7, false],
  ])('should match <h%d> element = %s', (level, isValid) => {
    const html = `<html><body><h${level}></h${level}></body></html>`;
    const result = check_headings(load(html));

    if (isValid) {
      expect(result.score_delta).toBeGreaterThan(0);
      expect(result.recommendations.length).toBe(0);
    } else {
      expect(result.score_delta).toBeLessThan(0);
      expect(result.recommendations.length).toBeGreaterThan(0);
    }
  });

  test('should descore the missing h{1,6} element', () => {
    const html = `<html></html>`;
    const result = check_headings(load(html));

    expect(result.score_delta).toBeLessThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });
});
