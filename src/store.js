import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import throttle from 'lodash/throttle';
import rootSaga from './root-saga';
import rootReducer from './root-reducer';
import { loadState, saveState } from './local-storage';

export const history = createHistory();

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    routerMiddleware(history),
    sagaMiddleware,
  ];

  // only use redux-logger in development
  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  /* eslint-disable no-underscore-dangle */
  // eslint-disable-next-line no-undef
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  /* eslint-enable */

  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
