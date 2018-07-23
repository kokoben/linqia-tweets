import * as actions from './types';

export const getTweets = query => ({
  type: actions.TWEETS_GET,
  query,
});

export const updateSort = sort => ({
  type: actions.SORT_UPDATE,
  sort,
});
