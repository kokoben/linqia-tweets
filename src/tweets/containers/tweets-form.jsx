import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { getTweets } from '../actions';

class TweetsForm extends Component {
  onSubmit(values) {
    console.log('props in form: ', values.hashtags);
    this.props.getTweets(values.hashtags);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <label>Hash Tags</label>
          <Field name="hashtags" component="input" />
        </div>
        <button type="submit">Search</button>
      </form>
    );
  }
}

TweetsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  getTweets: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getTweets,
  }, dispatch)
);

export default reduxForm({
  form: 'tweets',
}, null, mapDispatchToProps)(TweetsForm);
