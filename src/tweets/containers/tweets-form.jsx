import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { getTweets } from '../actions';

class TweetsForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log('props in form: ', values.hashtags);
    this.props.getTweets(values.hashtags);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
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

TweetsForm = connect(null, mapDispatchToProps)(TweetsForm);

export default reduxForm({
  form: 'tweets',
})(TweetsForm);
