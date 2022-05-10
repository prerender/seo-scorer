import { IRecommendation } from '../interfaces';
import { IChecker } from '../interfaces/checker.interface';

export const check_title_element: IChecker = ({ $ }) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 0.0;
  const element = $('title');

  // Analyze the <title> element.
  if (!element.text().trim().length) {
    const penalty = -10.0;
    score_delta += penalty;

    recommendations.push({
      description: 'Define the <title>My Site</title> element',
      documentation: 'https://docs.prerender.io/v1/docs/page-title',
      scoreDelta: penalty,
    });
  }
  // Long title
  else if (element.text().trim().length > 60) {
    const penalty = -5.0;
    score_delta += penalty;

    recommendations.push({
      description: 'Truncated title in SERPS',
      documentation: 'https://prerender.io/technical-seo-issues/',
      scoreDelta: penalty,
    });
  }
  // Perfect title
  else {
    score_delta += 5.0;
  }

  return {
    score_delta,
    recommendations,
  };
};
