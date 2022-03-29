import { CheerioAPI } from 'cheerio';

export type ICheck = (
  $: CheerioAPI,
) => {
  score_delta: number;
  recommendations: string[];
};
