import { IChecker, ICheckerContext, IRecommendation } from '../interfaces';

export const check_img_alt: IChecker = ({ $, raw_html }: ICheckerContext) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 0;

  let img_total = 0;
  let img_with_alt = 0;
  let img_without_alt = 0;

  $('img').each((i, img) => {
    const alt = $(img).attr('alt');

    if (alt && alt.length > 0) {
      img_with_alt++;
    } else {
      img_without_alt++;
    }

    img_total++;
  });

  // Maximum of 10 penality from missing alts
  const penalty = Math.min(10, img_without_alt) * -1;

  // If there are no images without alt then give penalty score
  if (img_without_alt) {
    score_delta += penalty;

    recommendations.push({
      description: 'Missing alt text on image(s)',
      documentation: 'https://prerender.io/technical-seo-issues/',
      scoreDelta: penalty,
    });
  }
  // Every image has an alt
  else if (img_with_alt > 0) {
    score_delta += 3;
  }

  return {
    score_delta,
    recommendations,
  };
};
