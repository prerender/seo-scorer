import { scorer } from '../scorer';
import { check_og_tags } from './og-tags.check';

describe('OG Tags check', () => {
  test('awards full score when all required and optional og tags are present', () => {
    const html = `
    <html>
    <head>
      <meta property="og:title" content="The Rock" />
      <meta property="og:type" content="video.movie" />
      <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
      <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
      <meta property="og:description" content="Stone fights nature" />
    </head>
    </html>
    `;
    const result = scorer(html, [check_og_tags]);

    expect(result.score).toBe(10.0);
    expect(result.recommendations).toEqual([]);
  });

  test('reports each absent required tag with its description and score delta', () => {
    const html = `
    <html>
    <head>
      <meta property="og:title" content="The Rock" />
      <meta property="og:type" content="video.movie" />
    </head>
    </html>`;
    const result = scorer(html, [check_og_tags]);

    expect(result.score).toBe(1);
    expect(result.recommendations.map((r) => r.description)).toEqual([
      'Missing og:image meta tag',
      'Missing og:url meta tag',
      'Missing og:description meta tag',
    ]);
  });

  test.each<[tag: string, propertyValue: string]>([
    ['title', 'OG:Title'],
    ['title', 'og:Title'],
    ['type', 'OG:Type'],
    ['type', 'og:Type'],
    ['image', 'OG:Image'],
    ['image', 'og:Image'],
    ['url', 'OG:URL'],
    ['url', 'og:Url'],
    ['description', 'OG:Description'],
    ['description', 'og:Description'],
  ])(
    'detects og:%s regardless of property-value case (property="%s")',
    (tag, propertyValue) => {
      const html = `<html><head><meta property="${propertyValue}" content="x" /></head></html>`;
      const result = scorer(html, [check_og_tags]);

      expect(result.recommendations.map((r) => r.description)).not.toContain(
        `Missing og:${tag} meta tag`,
      );
    },
  );

  test.each<[tag: string, attribute: 'property' | 'name']>([
    ['title', 'property'],
    ['title', 'name'],
    ['type', 'property'],
    ['type', 'name'],
    ['image', 'property'],
    ['image', 'name'],
    ['url', 'property'],
    ['url', 'name'],
    ['description', 'property'],
    ['description', 'name'],
  ])(
    'detects og:%s when declared with %s attribute',
    (tag, attribute) => {
      const html = `<html><head><meta ${attribute}="og:${tag}" content="x" /></head></html>`;
      const result = scorer(html, [check_og_tags]);

      expect(result.recommendations.map((r) => r.description)).not.toContain(
        `Missing og:${tag} meta tag`,
      );
    },
  );

  test.each<[tag: string, attribute: 'property' | 'name']>([
    ['title', 'property'],
    ['title', 'name'],
    ['type', 'property'],
    ['type', 'name'],
    ['image', 'property'],
    ['image', 'name'],
    ['url', 'property'],
    ['url', 'name'],
    ['description', 'property'],
    ['description', 'name'],
  ])(
    'reports og:%s as missing when its %s attribute has empty content',
    (tag, attribute) => {
      const html = `<html><head><meta ${attribute}="og:${tag}" content="" /></head></html>`;
      const result = scorer(html, [check_og_tags]);

      expect(result.recommendations.map((r) => r.description)).toContain(
        `Missing og:${tag} meta tag`,
      );
    },
  );
});
