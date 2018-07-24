import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tweet from '../components/tweet';
import TweetsSelector from '../selectors/sorted-tweets';

class TweetsList extends Component {
  constructor(props) {
    super(props);
    this.listTweets = this.listTweets.bind(this);
  }

  listTweets() {
    if (!this.props.tweets) return null;
    const tweets = this.props.sortedTweets.map((tweet, index) => (
      <Tweet
        index={index}
        key={tweet.id}
        name={tweet.user.name}
        screenName={tweet.user.screen_name}
        text={tweet.text}
        retweetCount={tweet.retweet_count}
        favoriteCount={tweet.favorite_count}
      />
    ));
    return tweets;
  }
  render() {
    if (this.props.loading) {
      return (
        <div className="message">
          Loading...
        </div>
      );
    }

    if (this.props.loadingFailed) {
      return (
        <div className="message error">
          Failed to load tweets.
        </div>
      );
    }

    if (!this.props.tweets) {
      return (
        <div className="message">
          Enter some hashtags.
        </div>
      );
    }

    if (this.props.sortedTweets && this.props.sortedTweets.length === 0) {
      return (
        <div className="message">
          No tweets found.
        </div>
      );
    }

    const tweets = this.listTweets();
    return (
      <div className="list">
        {tweets}
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
TweetsList.propTypes = {
  sortedTweets: PropTypes.array,
  tweets: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  loadingFailed: PropTypes.bool.isRequired,
};
/* eslint-enable */

const mapStateToProps = state => ({
  tweets: state.tweets.tweets,
  sortedTweets: TweetsSelector(state),
  loading: state.tweets.loading,
  loadingFailed: state.tweets.loadingFailed,
});

export default connect(mapStateToProps, null)(TweetsList);

