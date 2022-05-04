import { IChecker, IRecommendation, ICheckerContext } from '../interfaces';

const documentation = 'https://docs.prerender.io/docs/open-graph';

export const check_og_tags: IChecker = ({ $, raw_html }: ICheckerContext) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 4.0;

  // required fields
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogType = $('meta[property="og:type"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  const ogURL = $('meta[property="og:url"]').attr('content');

  const penalty = -1;
  if (!ogTitle) {
    score_delta += penalty;

    recommendations.push({
      description: 'Missing og:title meta tag',
      documentation: documentation,
      scoreDelta: penalty,
    });
  }

  if (!ogType) {
    score_delta += penalty;

    recommendations.push({
      description: 'Missing og:type meta tag',
      documentation: documentation,
      scoreDelta: penalty,
    });
  }

  if (!ogImage) {
    score_delta += penalty;

    recommendations.push({
      description: 'Missing og:image meta tag',
      documentation: documentation,
      scoreDelta: penalty,
    });
  }

  if (!ogURL) {
    score_delta += penalty;

    recommendations.push({
      description: 'Missing og:url meta tag',
      documentation: documentation,
      scoreDelta: penalty,
    });
  }

  return {
    score_delta,
    recommendations,
  };
};
