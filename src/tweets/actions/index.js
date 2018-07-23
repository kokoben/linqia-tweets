import * as actions from './types';

export const getTweets = query => ({
  type: actions.TWEETS_GET,
  query,
});

