import { IRecommendation } from './recommendation.interface';

export interface IResult {
  score: number;
  recommendations: IRecommendation[];
}
