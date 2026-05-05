import { CheerioAPI } from 'cheerio';
import { IChecker, ICheckerContext, IRecommendation } from '../interfaces';

const documentation = 'https://docs.prerender.io/docs/open-graph';

// Open Graph tags can be declared in several shapes that all appear in the wild:
//   - canonical:        <meta property="og:title" ...>
//   - mixed-case value: <meta property="OG:Title" ...>  (CMSes that title-case attribute values)
//   - name fallback:    <meta name="og:title" ...>      (some CMSes / SEO plugins)
// The CSS Level 4 `i` flag matches the attribute value case-insensitively (cheerio supports it).
const findOgContent = ($: CheerioAPI, tag: string): string | undefined =>
  $(`meta[property="og:${tag}" i]`).attr('content') ||
  $(`meta[name="og:${tag}" i]`).attr('content');

export const check_og_tags: IChecker = ({ $ }: ICheckerContext) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 0;

  // required fields
  const ogTitle = findOgContent($, 'title');
  const ogType = findOgContent($, 'type');
  const ogImage = findOgContent($, 'image');
  const ogURL = findOgContent($, 'url');

  const penalty = -2;
  const optionalPenalty = -1;

  if (!ogTitle) {
    score_delta += penalty;

    recommendations.push({
      description: 'Missing og:title meta tag',
      documentation: documentation,
      scoreDelta: penalty,
    });
  } else {
    score_delta += Math.abs(penalty);
  }

  if (!ogType) {
    score_delta += penalty;

    recommendations.push({
      description: 'Missing og:type meta tag',
      documentation: documentation,
      scoreDelta: penalty,
    });
  } else {
    score_delta += Math.abs(penalty);
  }

  if (!ogImage) {
    score_delta += penalty;

    recommendations.push({
      description: 'Missing og:image meta tag',
      documentation: documentation,
      scoreDelta: penalty,
    });
  } else {
    score_delta += Math.abs(penalty);
  }

  if (!ogURL) {
    score_delta += penalty;

    recommendations.push({
      description: 'Missing og:url meta tag',
      documentation: documentation,
      scoreDelta: penalty,
    });
  } else {
    score_delta += Math.abs(penalty);
  }

  // optional fields
  const ogDescription = findOgContent($, 'description');

  if (!ogDescription) {
    score_delta -= optionalPenalty;

    recommendations.push({
      description: 'Missing og:description meta tag',
      documentation: documentation,
      scoreDelta: penalty,
    });
  } else {
    score_delta += Math.abs(optionalPenalty) * 2;
  }

  return {
    score_delta,
    recommendations,
  };
};
