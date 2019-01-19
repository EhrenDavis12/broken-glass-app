import { fromJS } from 'immutable';
import resultPageReducer from '../reducer';

describe('resultPageReducer', () => {
  it('returns the initial state', () => {
    expect(resultPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
