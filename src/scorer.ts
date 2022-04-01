import { load } from 'cheerio';
import * as checkers from './checks';
import { InvalidContent } from './exceptions';
import { ICheckerContext } from './interfaces';
import { IChecker } from './interfaces/checker.interface';
import { IResult } from './interfaces/result.interface';

const all_check: IChecker[] = [
  checkers.check_html_element,
  checkers.check_title_element,
  // Automation: Checker injection point
  checkers.check_headings,
];

export const scorer = (
  raw_html: string,
  overwrite_checks: IChecker[] | null = null,
): IResult => {
  if (typeof raw_html !== 'string') {
    throw new InvalidContent();
  }

  // Parse the HTML to iterate on the DOM
  const $ = load(raw_html, {
    decodeEntities: true,
    lowerCaseTags: true,
  });

  let score = 0.0;
  const recommendations: IResult['recommendations'] = [];
  const ctx: ICheckerContext = {
    $,
    raw_html,
  };

  (overwrite_checks ?? all_check).forEach(check => {
    const result = check(ctx);

    score += result.score_delta;
    recommendations.push(...result.recommendations);
  });

  return { score, recommendations };
};
