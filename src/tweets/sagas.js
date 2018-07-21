import { put, call, takeEvery } from 'redux-saga/effects';
import oauthSignature from 'oauth-signature';
import fetch from 'isomorphic-fetch';
import promise from 'es6-promise';
import * as actions from './actions/types';
import { consumerKey, accessToken, tokenSecret, consumerSecret } from '../keys';

promise.polyfill();

const getRandStr = () => {
  const rand = (Math.random() + 1).toString(36).slice(2);
  // if string value is too small and no longer alphanumeric,
  // try again.
  return rand;
};

const authApi = {
  register(query, options) {
    return fetch('https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json' + '?q=' + query + '?count=100', options)
      .then(response => response.json())
      .catch(error => error)
      .then((data) => {
        console.log('final data', data);
        return data;
      });
  },
};


// workers
export function* getTweetsAsync(action) {
  try {
    // create oauth signature
    const nonce = getRandStr();
    const time = Date.now();
    const httpMethod = 'GET';
    const url = 'https://api.twitter.com/1.1/search/tweets.json';
    const parameters = {
      include_entities: true,
      oauth_consumer_key: consumerKey,
      oauth_token: accessToken,
      oauth_nonce: nonce,
      oauth_timestamp: time,
      oauth_signature_method: 'HMAC_SHA1',
      oauth_version: '1.0',
    };

    // generate a BASE64 encoded HMAC-SHA1 hash
    // eslint-disable-next-line max-len
    const signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodedSignature: false });
    console.log('signature', signature);

    const options = {
      method: 'get',
      headers: {
        Authorization: 'OAuth oauth_consumer_key="' + encodeURIComponent(parameters.oauth_consumer_key) + '"' +
        ', oauth_nonce="' + encodeURIComponent(parameters.oauth_nonce) + '", oauth_signature="' +
        encodeURIComponent(parameters.oauth_signature) + '", oauth_signature_method="' +
        encodeURIComponent(parameters.oauth_signature_method) + '", oauth_timestamp="' +
        encodeURIComponent(parameters.oauth_timestamp) + '", oauth_token="' +
        encodeURIComponent(parameters.oauth_token) + '", oauth_version="' + encodeURIComponent(parameters.oauth_version),
      },
    };

    // send the request
    const data = yield call(authApi.register, action.query, options);
    console.log(data);
    yield put({ type: actions.TWEETS_GET_SUCCESS, data });
  } catch (e) {
    yield put({ type: actions.TWEETS_GET_FAIL, message: e.message });
  }
}

// watchers
export function* watchGetTweets() {
  yield takeEvery(actions.TWEETS_GET, getTweetsAsync);
}
