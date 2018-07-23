import { combineReducers } from 'redux';
import * as actions from './actions/types';

/* eslint-disable consistent-return */
export const tweets = (state = null, action) => {
  switch (action.type) {
    case actions.TWEETS_GET_SUCCESS:
      return action.data;
    case actions.TWEETS_GET_FAIL:
      console.log(action.message);
      break;
    default:
      return state;
  }
};

export const count = (state = 10, action) => {
  switch (action.type) {
    case actions.COUNT_UPDATE:
      return action.count;
    default:
      return state;
  }
};

export const sort = (state = 'none', action) => {
  switch (action.type) {
    case action.SORT_UPDATE:
      return action.sort;
    default:
      return state;
  }
};

/* eslint-enable */

export default combineReducers({
  tweets,
  count,
  sort,
});
