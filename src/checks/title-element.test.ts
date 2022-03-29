import { load } from 'cheerio';
import { check_title_element } from './title-element.check';

describe('Title Element Test', () => {
  test('should not find <title> tag', () => {
    const html = `<html></html>`;
    const result = check_title_element(load(html));

    expect(result.score_delta).toBeLessThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  test('should find <title> tag', () => {
    const html = `<html><head><title>My Site</title></head></html>`;
    const result = check_title_element(load(html));

    expect(result.score_delta).not.toBeLessThan(0);
    expect(result.recommendations.length).not.toBeGreaterThan(0);
  });
});
