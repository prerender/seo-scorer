---
to: src/checks/<%= h.inflection.dasherize(name) %>.check.ts
---
import { CheerioAPI } from 'cheerio';
import { IChecker, IRecommendation } from '../interfaces';

export const check_<%= h.inflection.underscore(name) %>: IChecker = ($: CheerioAPI) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 0.0;

  return {
    score_delta,
    recommendations,
  };
};

