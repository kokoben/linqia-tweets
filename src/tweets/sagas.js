import axios from 'axios';
import oauthSignature from 'oauth-signature';
import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from './actions/types';
import { consumerKey, accessToken, tokenSecret, consumerSecret } from '../keys';

/*
const asciiCodes = [
  '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
  '41', '42', '43', '44', '45', '46', '47', '48', '49', '4A',
  '4B', '4C', '4D', '4E', '4F', '50', '51', '52', '53', '54',
  '55', '56', '57', '58', '59', '5A', '61', '62', '63', '64',
  '65', '66', '67', '68', '69', '6A', '6B', '6C', '6D', '6E',
  '6F', '70', '71', '72', '73', '74', '75', '76', '77', '78',
  '79', '7A', '2D', '2E', '5F', '7E',

];

const stringToBytes = str => {
  let ch, st, re = [];

  for (let i = 0; i < str.length; i++ ) {
    ch = str.charCodeAt(i);  // get char
    st = [];                 // set up "stack"
    do {
      st.push( ch & 0xFF );  // push byte to stack
      ch = ch >> 8;          // shift value down by 1 byte
    }
    while ( ch );
    // add stack contents to result
    // done because chars have "wrong" endianness
    re = re.concat( st.reverse() );
  }
  // return an array of bytes
  return re;
}

const percentEncode = str => {
  let byteArr = stringToBytes(str);
  let res = '';
  for (let i = 0; i < byteArr.length; i++) {
    let chr = byteArr[i].toString();

    if (!asciiCodes.includes(chr)) {
      res.push('%');
    }
    res.push(chr);
  }
  return res;
};
*/

const getRandStr = () => {
  const rand = Math.random().toString(36).slice(2);
  // if string value is too small and no longer alphanumeric,
  // try again.
  return rand.length === 16 ? rand : getRandStr();
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

    const body = {
      method: 'get',
      baseUrl: 'https://api.twitter.com/1.1/search/tweets.json',
      params: {
        q: action.query,
        count: 100,
      },
      auth: {
        include_entities: true,
        oauth_consumer_key: consumerKey,
        oauth_nonce: nonce,
        oath_signature: signature,
        oauth_signature_method: 'HMAC_SHA1',
        oauth_timestamp: time,
        oauth_token: accessToken,
        oauth_version: '1.0',
      },
    };

    const response = yield call(axios.get, body);
    yield put({ type: actions.TWEETS_GET_SUCCESS, response });
  } catch (e) {
    yield put({ type: actions.TWEETS_GET_FAIL, message: e.message });
  }
}
// watchers
export function* watchGetTweets() {
  yield takeEvery(actions.TWEETS_GET, getTweetsAsync);
}
