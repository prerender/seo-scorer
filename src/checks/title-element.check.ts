import { CheerioAPI } from 'cheerio';
import { IRecommendation } from '../interfaces';
import { IChecker } from '../interfaces/checker.interface';

export const check_title_element: IChecker = ($: CheerioAPI) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 0.0;
  const element = $('title');

  // Analyse the <title> element.
  if (!element.length) {
    recommendations.push({
      description: 'Define the <title>My Site</title> element',
      documentation: 'https://docs.prerender.io/v1/docs/page-title',
    });
    score_delta -= 10.0;
  } else {
    score_delta += 5.0;
  }

  return {
    score_delta,
    recommendations,
  };
};
