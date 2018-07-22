import React, { Component } from 'react';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Tweet from '../components/tweet';

class TweetsList extends Component {
  constructor(props) {
    super(props);
    this.listTweets = this.listTweets.bind(this);
  }

  listTweets(tweets) {
  }

  render() {
    return (
      <div>
        list
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tweets: state.tweets.tweets,
  count: state.tweets.count,
  sort: state.tweets.sort,
});

export default connect(mapStateToProps, null)(TweetsList);

