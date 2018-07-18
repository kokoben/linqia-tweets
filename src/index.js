import React from 'react';
import { render } from 'react-dom';
import configureStore, { history } from './store';
import Root from './root';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line no-undef
const target = document.querySelector('#root');
const store = configureStore();

render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Root store={store} history={history} />,
  target,
);

registerServiceWorker();
