import { CheerioAPI } from 'cheerio';

export interface ICheckerContext {
  $: CheerioAPI;
  raw_html: string;
}
