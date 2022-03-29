---
to: src/checks/<%= h.inflection.dasherize(name) %>.check.ts
---
import { CheerioAPI } from 'cheerio';
import { ICheck } from '../interfaces/check.interface';

export const check_<%= h.inflection.underscore(name) %>: ICheck = ($: CheerioAPI) => {
  const recommendations: string[] = [];
  let score_delta = 0.0;

  return {
    score_delta,
    recommendations,
  };
};

