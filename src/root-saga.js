import * as TweetsSagas from './tweets/sagas';

export default function* rootSaga() {
  yield [
    TweetsSagas.watchGetTweets(),
  ];
}
