import { IChecker, ICheckerContext, IRecommendation } from '../interfaces';

export const check_meta_desc: IChecker = ({ $, raw_html }: ICheckerContext) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 0.0;

  // Check for meta description element
  const meta_desc = $('meta[name="description"]');

  // Check if the description is not too long for SERPS
  if (meta_desc.length > 0) {
    const desc = meta_desc.attr('content');

    if (desc && desc.trim().length > 160) {
      // Calculate score delta
      const penalty = -5.0;
      score_delta += penalty;

      // Add recommendation
      recommendations.push({
        description: 'Truncated meta description in SERPS',
        documentation: 'https://docs.prerender.io/v1/docs/meta-description',
        scoreDelta: penalty,
      });
    }
    // Meta description is provided and withhin the maximum limit
    else if (desc && desc.trim().length > 0 && desc.trim().length <= 160) {
      score_delta += 5.0;
    }
    // Missing content
    else {
      const penalty = -10.0;
      score_delta += penalty;

      // Add recommendation
      recommendations.push({
        description:
          'Define the content for <meta name="description" content="Example description for SERP"> element',
        documentation: 'https://prerender.io/technical-seo-issues/',
        scoreDelta: penalty,
      });
    }
  }
  // Penalize the missing meta description
  else {
    const penalty = -10.0;
    score_delta += penalty;

    // Add recommendation
    recommendations.push({
      description:
        'Define the <meta name="description" content="Example description for SERP"> element',
      documentation: 'https://prerender.io/technical-seo-issues/',
      scoreDelta: penalty,
    });
  }

  return {
    score_delta,
    recommendations,
  };
};
