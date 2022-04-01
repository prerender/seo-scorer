import { scorer } from '../scorer';
import { check_title_element } from './title-element.check';

describe('Title Element Test', () => {
  test('should not find <title> tag', () => {
    const html = `<html></html>`;
    const result = scorer(html, [check_title_element]);

    expect(result.score).toBeLessThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  test('should find <title> tag', () => {
    const html = `<html><head><title>My Site</title></head></html>`;
    const result = scorer(html, [check_title_element]);

    expect(result.score).not.toBeLessThan(0);
    expect(result.recommendations.length).not.toBeGreaterThan(0);
  });
});
