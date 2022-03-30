import { load } from 'cheerio';
import * as checkers from './checks';
import { InvalidContent } from './exceptions';
import { IChecker } from './interfaces/checker.interface';
import { IResult } from './interfaces/result.interface';

const checks: IChecker[] = [
  checkers.check_html_element,
  checkers.check_title_element,
  // Automation: Checker injection point
];

export const scorer = (html: string): IResult => {
  if (typeof html !== 'string') {
    throw new InvalidContent();
  }

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
