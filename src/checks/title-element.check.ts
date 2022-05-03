import { IRecommendation } from '../interfaces';
import { IChecker } from '../interfaces/checker.interface';

export const check_title_element: IChecker = ({ $ }) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 0.0;
  const element = $('title');

  // Analyze the <title> element.
  if (!element.length) {
    const penalty = -10.0
    score_delta += penalty;

    recommendations.push({
      description: 'Define the <title>My Site</title> element',
      documentation: 'https://docs.prerender.io/v1/docs/page-title',
      scoreDelta: penalty
    });
  } else {
    score_delta += 5.0;
  }

  return {
    score_delta,
    recommendations,
  };
};
