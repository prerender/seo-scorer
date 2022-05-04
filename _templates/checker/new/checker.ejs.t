---
to: src/checks/<%= h.inflection.dasherize(name) %>.check.ts
---
import { CheerioAPI } from 'cheerio';
import { IChecker, IRecommendation, ICheckerContext } from '../interfaces';

export const check_<%= h.inflection.underscore(name) %>: IChecker = ({$, raw_html}: ICheckerContext) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 0.0;

  return {
    score_delta,
    recommendations,
  };
};

