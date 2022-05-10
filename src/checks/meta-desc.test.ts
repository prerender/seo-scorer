import { scorer } from '../scorer';
import { check_meta_desc } from './meta-desc.check';

describe('Meta Desc Test', () => {
  test('should add score for defined meta description', () => {
    const html = `<html>
      <meta name="description" content="Example description for SERP">
    </html>`;
    const result = scorer(html, [check_meta_desc]);

    expect(result.score).toBeGreaterThan(0);
    expect(result.recommendations.length).toBe(0);
  });

  test('should penalize the missing meta', () => {
    const html = `<html></html>`;
    const result = scorer(html, [check_meta_desc]);

    expect(result.score).toBeLessThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  test('should penalize the missing meta description content', () => {
    const html = `<html>
      <meta name="description" content="">
    </html>`;
    const result = scorer(html, [check_meta_desc]);

    expect(result.score).toBeLessThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  test('should penalize the too long missing meta', () => {
    const html = `<html>
      <meta name="description" content="${'a'.repeat(170)}">
    </html>`;
    const result = scorer(html, [check_meta_desc]);

    expect(result.score).toBeLessThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });
});
