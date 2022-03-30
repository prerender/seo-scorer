import { CheerioAPI } from 'cheerio';
import { IRecommendation } from './recommendation.interface';

export type IChecker = ($: CheerioAPI) => {
  score_delta: number;
  recommendations: IRecommendation[];
};
