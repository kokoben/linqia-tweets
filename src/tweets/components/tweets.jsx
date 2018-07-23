import React from 'react';
import TweetsForm from '../containers/tweets-form';
import TweetsList from '../containers/tweets-list';

const Tweets = () => (
  <div>
    <h1 className="header">Twitter Content Lab</h1>
    <TweetsForm />
    <TweetsList />
  </div>
);

export default Tweets;
