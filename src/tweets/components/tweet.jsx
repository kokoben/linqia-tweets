import React from 'react';
import PropTypes from 'prop-types';

const Tweet = props => (
  <div className="tweet">
    <p>{props.index+1}. <b>{props.name}</b> @{props.screenName}</p>
    <p>{props.text}</p>
    <p>Retweets: {props.retweetCount} Favorites: {props.favoriteCount}</p>
  </div>
);

Tweet.propTypes = {
  name: PropTypes.string.isRequired,
  screenName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  retweetCount: PropTypes.number.isRequired,
  favoriteCount: PropTypes.number.isRequired,
};

export default Tweet;

