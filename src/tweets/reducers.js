import { combineReducers } from 'redux';
import * as actions from './actions/types';

/* eslint-disable consistent-return */
export const tweets = (state = {}, action) => {
  switch (action.type) {
    case actions.TWEETS_GET_SUCCESS:
      return action.response;
    case actions.TWEETS_GET_FAIL:
      console.log(action.message);
      break;
    default:
      return state;
  }
};

/* eslint-enable */

export default combineReducers({
  tweets,
});
