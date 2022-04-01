import { scorer } from '../scorer';
import { check_html_element } from './html-element.check';

describe('HTML Element Test', () => {
  test('should not find <html> element', () => {
    const html = `<body></body>`;
    const result = scorer(html, [check_html_element]);

    expect(
      result.recommendations.find(
        r => r.description === 'Missing HTML element',
      ),
    ).toBeTruthy();
  });

  test('should find <html> element', () => {
    const html = `<html><body></body></html>`;
    const result = scorer(html, [check_html_element]);

    expect(result.score).toBeGreaterThanOrEqual(0);
  });

  describe('lang attribute', () => {
    test('should find <html> lang attribute', () => {
      const html = `<html lang="en"></html>`;
      const result = scorer(html, [check_html_element]);

      expect(
        result.recommendations.find(
          r => r.description === 'Define the <html lang="en_us"> attribute',
        ),
      ).toBeFalsy();
    });

    test('should not find <html> lang attribute', () => {
      const html = `<html></html>`;
      const result = scorer(html, [check_html_element]);

      expect(
        result.recommendations.find(
          r => r.description === 'Define the <html lang="en_us"> attribute',
        ),
      ).toBeTruthy();
    });
  });
});
