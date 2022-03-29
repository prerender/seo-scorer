import { CheerioAPI } from 'cheerio';
import { ICheck } from '../interfaces/check.interface';

export const check_html_element: ICheck = ($: CheerioAPI) => {
  const recommendations: string[] = [];
  let score_delta = 0.0;

  // Analyse the <html lang=""> attribute.
  if (!$('html').attr('lang')?.length) {
    recommendations.push('Define the <html lang="en_us"> attribute');
    score_delta -= 1;
  }

  return {
    score_delta,
    recommendations,
  };
};
