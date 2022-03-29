import { scorer } from './scorer';

describe('Empty content', () => {
  test('should handle the 0 byte content', () => {
    const html = ``;
    const result = scorer(html);

    expect(result.score).toBeLessThan(0.0);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });
});
