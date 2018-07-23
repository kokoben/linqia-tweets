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
/* eslint-enable */

export const loading = (state = false, action) => {
  switch (action.type) {
    case actions.LOADING_UPDATE:
      return action.loading;
    default:
      return state;
  }
};

export default combineReducers({
  tweets,
  loading,
});
