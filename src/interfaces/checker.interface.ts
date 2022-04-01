import { ICheckerContext } from './checker-context.interface';
import { IRecommendation } from './recommendation.interface';

export type IChecker = (ctx: ICheckerContext) => {
  score_delta: number;
  recommendations: IRecommendation[];
};
