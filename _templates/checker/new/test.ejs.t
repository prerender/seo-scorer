---
to: src/checks/<%= h.inflection.dasherize(name) %>.test.ts
---
import { scorer } from '../scorer';
import { check_<%= h.inflection.underscore(name) %> } from './<%= h.inflection.dasherize(name) %>.check';

describe('<%= h.inflection.titleize(name) %> Test', () => {
  test('should ', () => {
    const html = `<html></html>`;
    const result = scorer(html, [check_<%= h.inflection.underscore(name) %>]);

    expect(result.score).toBeGreaterThan(0);
    expect(result.recommendations.length).toBe(0);
  });

  test('should not', () => {
    const html = `<html></html>`;
    const result = scorer(html, [check_<%= h.inflection.underscore(name) %>]);

    expect(result.score).toBeLessThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });
});
