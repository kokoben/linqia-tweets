import { createSelector } from 'reselect';

// determines the list of tweets to display.
// calculates using the currently selected count and sort metric.
const tweetsSelector = state => state.tweets.tweets;
const countSelector = state => state.form.tweets.values.count;
const sortSelector = state => state.form.tweets.values.sort;

const getSortedTweets = (tweets, count, sort) => {
  if (!tweets || tweets.message === "Failed to fetch") return null;

  // first sort the list. don't bother sorting it if sort is set to none.
  const sortedList = tweets.statuses.slice();
  if (sort === 'Retweet Count') {
    sortedList.sort((a, b) => b.retweet_count - a.retweet_count);
  } else if (sort === 'Favorite Count') {
    sortedList.sort((a, b) => b.favorite_count - a.favorite_count);
  } else if (sort === 'Alphabetical (name)') {
    sortedList.sort((a, b) => a.user.name.localeCompare(b.user.name));
  } else if (sort === 'Alphabetical (twitter handle)') {
    sortedList.sort((a, b) => a.user.screen_name.localeCompare(b.user.screen_name));
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
