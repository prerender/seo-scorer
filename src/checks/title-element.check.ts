import { CheerioAPI } from 'cheerio';
import { ICheck } from '../interfaces/check.interface';

export const check_title_element: ICheck = ($: CheerioAPI) => {
  const recommendations: string[] = [];
  let score_delta = 0.0;
  const element = $('title');

  // Analyse the <title> element.
  if (!element.length) {
    recommendations.push('Define the <title>My Site</title> element');
    score_delta -= 10.0;
  } else {
    score_delta += 5.0;
  }

  return {
    score_delta,
    recommendations,
  };
};
