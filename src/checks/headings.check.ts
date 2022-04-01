import { IChecker, IRecommendation } from '../interfaces';

const documentation = 'https://docs.prerender.io/v1/docs/heading-elements';

export const check_headings: IChecker = ({ $ }) => {
  const recommendations: IRecommendation[] = [];
  let score_delta = 0.0;

  const col_h1 = $('h1').toArray();
  const col_h2 = $('h2').toArray();
  const col_h3 = $('h3').toArray();
  const col_h4 = $('h4').toArray();
  const col_h5 = $('h5').toArray();
  const col_h6 = $('h6').toArray();

  const col_hx_all = [
    ...col_h1,
    ...col_h2,
    ...col_h3,
    ...col_h4,
    ...col_h5,
    ...col_h6,
  ];

  if (col_hx_all.length !== 0) {
    score_delta += 5;

    // Missing H1 but has other H# elements
    if (col_h1.length === 0) {
      score_delta -= 1;
      recommendations.push({
        description: 'Missing <h1> element',
        documentation: documentation + '#missing-h1-element',
      });
    } else {
      // Too many H1 elements
      if (col_h1.length > 3) {
        score_delta -= 5 + Math.min(5, col_h1.length - 3);
        recommendations.push({
          description: 'Too many <h1> element',
          documentation: documentation + '#too-many-h1-element',
        });
      }
      // Between 1-3 H1 elements
      else {
        score_delta += 5;
      }
    }
  } else {
    score_delta -= 10;
    recommendations.push({
      description: 'Missing heading elements',
      documentation,
    });
  }

  return {
    score_delta,
    recommendations,
  };
};
