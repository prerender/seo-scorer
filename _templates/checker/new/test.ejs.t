---
to: src/checks/<%= h.inflection.dasherize(name) %>.test.ts
---
import { load } from 'cheerio';
import { check_<%= h.inflection.underscore(name) %> } from './<%= h.inflection.dasherize(name) %>.check';

describe('<%= h.inflection.titleize(name) %> Test', () => {
  test('should ', () => {
    const html = `<html></html>`;
    const result = check_<%= h.inflection.underscore(name) %>(load(html));

    expect(result.score_delta).toBeGreaterThan(0);
    expect(result.recommendations.length).toBe(0);
  });

  test('should not', () => {
    const html = `<html></html>`;
    const result = check_<%= h.inflection.underscore(name) %>(load(html));

    expect(result.score_delta).toBeLessThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });
});
