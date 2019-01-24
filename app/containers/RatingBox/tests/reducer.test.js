import { fromJS } from 'immutable';
import ratingBoxReducer from '../reducer';

describe('ratingBoxReducer', () => {
  it('returns the initial state', () => {
    expect(ratingBoxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
