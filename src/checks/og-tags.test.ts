import { scorer } from '../scorer';
import { check_og_tags } from './og-tags.check';

describe('Og Tags Test', () => {
  test('should not remove any points', () => {
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
    expect(result.recommendations.length).toBe(0);
  });

  test('should remove 2 point for each missing element', () => {
    const html = `
    <html>
    <head>
      <meta property="og:title" content="The Rock" />
      <meta property="og:type" content="video.movie" />
    </head>
    </html>`;
    const result = scorer(html, [check_og_tags]);

    expect(result.score).toBe(1);
    expect(result.recommendations.length).toBe(3);
  });
});
