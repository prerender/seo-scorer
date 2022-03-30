import { CheerioAPI } from 'cheerio';
import { IChecker, IRecommendation } from '../interfaces';

export const check_html_element: IChecker = ($: CheerioAPI) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 0.0;

  // Analyse the <html lang=""> attribute.
  if (!$('html').attr('lang')?.length) {
    recommendations.push({
      description: 'Define the <html lang="en_us"> attribute',
      documentation: 'https://docs.prerender.io/docs/html-element',
    });
    score_delta -= 1;
  }

  return {
    score_delta,
    recommendations,
  };
};
