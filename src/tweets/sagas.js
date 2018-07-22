import { put, call, takeEvery } from 'redux-saga/effects';
import oauthSignature from 'oauth-signature';
import fetch from 'isomorphic-fetch';
import promise from 'es6-promise';
import * as actions from './actions/types';
import { consumerKey, accessToken, tokenSecret, consumerSecret } from '../keys';

promise.polyfill();

const getRandStr = (length) => {
  let str = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    str += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return str;
};

const callApi = {
  register(query, options) {
    console.log('query', query);
    console.log(options.headers);
    return fetch("https://morning-anchorage-36313.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=" + encodeURIComponent(query) + "&count=100", options)
      .then(response => response.json())
      .catch(error => error)
      .then((data) => {
        return data;
      });
  },
};


// workers
export function* getTweetsAsync(action) {
  try {
    // create oauth signature
    const nonce = getRandStr(32);
    const httpMethod = 'GET';
    const url = 'https://api.twitter.com/1.1/search/tweets.json';
    const time = Date.now() / 1000;
    const parameters = {
      q: action.query,
      count: 100,
      oauth_consumer_key: consumerKey,
      oauth_nonce: nonce,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: time,
      oauth_token: accessToken,
      oauth_version: '1.0',
    };

    // generate a BASE64 encoded HMAC-SHA1 hash
    // eslint-disable-next-line max-len
    const signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });
    console.log('signature', signature);

    const options = {
      method: 'get',
      headers: {
        Authorization: 'OAuth ' + encodeURIComponent('oauth_consumer_key') + '="' + encodeURIComponent(parameters.oauth_consumer_key) + '"' +
        ', ' + encodeURIComponent('oauth_nonce') + '="' + encodeURIComponent(parameters.oauth_nonce) + '", ' + encodeURIComponent('oauth_signature') + '="' +
        encodeURIComponent(signature) + '", ' + encodeURIComponent('oauth_signature_method') + '="' +
        encodeURIComponent(parameters.oauth_signature_method) + '", ' + encodeURIComponent('oauth_timestamp') + '="' +
        encodeURIComponent(parameters.oauth_timestamp) + '", ' + encodeURIComponent('oauth_token') + '="' +
        encodeURIComponent(parameters.oauth_token) + '", ' + encodeURIComponent('oauth_version') + '="' + encodeURIComponent(parameters.oauth_version) + '"',
      },
    };

    // send the request
    const data = yield call(callApi.register, action.query, options);
    yield put({ type: actions.TWEETS_GET_SUCCESS, data });
  } catch (e) {
    yield put({ type: actions.TWEETS_GET_FAIL, message: e.message });
  }
}

// watchers
export function* watchGetTweets() {
  yield takeEvery(actions.TWEETS_GET, getTweetsAsync);
}
