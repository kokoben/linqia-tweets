import { createSelector } from 'reselect';

// determines the list of tweets to display.
// calculates using the currently selected count and sort metric.
const tweetsSelector = state => state.tweets.tweets.statuses;
const countSelector = state => state.tweets.count;
const sortSelector = state => state.tweets.sort;

const getSortedTweets = (tweets, count, sort) => {
  if (sort === 'none') return tweets;

  // first sort the list.
  const sortedList = tweets.slice();
  if (sort === 'retweetsCount') {
    sortedList.sort((a, b) => b.retweet_count - a.retweet_count);
  } else if (sort === 'favoritesCount') {
    sortedList.sort((a, b) => b.favoriteCount - a.favoriteCount);
  }

  // return the number of tweets equal to count
  return sortedList.slice(0, count);
};

export default createSelector(
  tweetsSelector,
  countSelector,
  sortSelector,
  getSortedTweets,
);
