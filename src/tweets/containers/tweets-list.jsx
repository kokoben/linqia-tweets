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
    console.log('in render', this.props.sortedTweets)
    if (!this.props.sortedTweets) {
      return (
        <div className="list">
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
  sortedTweets: PropTypes.array.isRequired,
};
/* eslint-enable */

const mapStateToProps = state => ({
  sortedTweets: TweetsSelector(state),
});

export default connect(mapStateToProps, null)(TweetsList);

