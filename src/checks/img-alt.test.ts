import { scorer } from '../scorer';
import { check_img_alt } from './img-alt.check';

describe('Img Alt Test', () => {
  test('should give extra score when every image has an alt', () => {
    const html = `<html><img src="" alt="yay" /></html>`;
    const result = scorer(html, [check_img_alt]);

    expect(result.score).toBeGreaterThan(0);
    expect(result.recommendations.length).toBe(0);
  });

  test('should not penalize when there is no image in the code', () => {
    const html = `<html></html>`;
    const result = scorer(html, [check_img_alt]);

    expect(result.score).toBe(0);
    expect(result.recommendations.length).toBe(0);
  });

  test('should give a penality for each missing alt', () => {
    const html = `<html><img src="" alt="" /><img src="" /><img src="" alt /></html>`;
    const result = scorer(html, [check_img_alt]);

    expect(result.score).toBe(-3);
    expect(result.recommendations.length).toBe(1);
  });

  test('should give a maximum of 10 penality point', () => {
    const html = `<html>${'<img src="" alt="" />'.repeat(
      20,
    )}<img src="" alt="yep!" /></html>`;
    const result = scorer(html, [check_img_alt]);

    expect(result.score).toBe(-10);
    expect(result.recommendations.length).toBe(1);
  });
});
