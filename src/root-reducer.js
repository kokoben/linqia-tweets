import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import TweetsReducers from './tweets/reducers';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  tweets: TweetsReducers,
});
