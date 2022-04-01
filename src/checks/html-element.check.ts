import { IChecker, IRecommendation } from '../interfaces';

export const check_html_element: IChecker = ({ $, raw_html }) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 0.0;
  const element = $('html');

  // We cannot test for the elemnent, beacuse when the $ initialized
  // it creates an <html> base with <head> and <body> if missing.
  if (!raw_html.match(/<html/i)) {
    score_delta -= 100;

    recommendations.push({
      description: 'Missing HTML element',
      documentation: 'https://docs.prerender.io/docs/html-element',
    });
  } else {
    // HTML element is defined
    score_delta += 1;

    const attr_lang = element.attr('lang');

    // Analyse the <html lang=""> attribute.
    if (!attr_lang?.length) {
      score_delta -= 1;

      recommendations.push({
        description: 'Define the <html lang="en_us"> attribute',
        documentation: 'https://docs.prerender.io/docs/html-element',
      });
    } else {
      // Lang is defined
      score_delta += 1;
    }
  }

  return {
    score_delta,
    recommendations,
  };
};
