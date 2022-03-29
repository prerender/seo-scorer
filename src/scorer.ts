import { load } from 'cheerio';
import * as checkers from './checks';
import { ICheck } from './interfaces/check.interface';
import { IResult } from './interfaces/result.interface';

const checks: ICheck[] = [
  checkers.check_html_element,
  // Automation: Checker injection point
];

export const scorer = (html: string): IResult => {
  // Parse the HTML to iterate on the DOM
  const $ = load(html, {
    decodeEntities: true,
    lowerCaseTags: true,
  });

  let score = 0.0;
  const recommendations: IResult['recommendations'] = [];

  checks.forEach(check => {
    const result = check($);

    score += result.score_delta;
    recommendations.push(...result.recommendations);
  });

  return { score, recommendations };
};
