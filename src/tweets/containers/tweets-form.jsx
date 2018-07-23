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
    // parse query by trimming spaces and adding hashtags if necessary.
    // if there's more than one hashtag, add OR operators between them
    // to get tweets that contain one more of those hashtags.
    const query = values.hashtags;
    const queryArr = query.split(' ');
    // get rid of empty strings caused by multiple spaces between search terms.
    const queryArrTrimmed = [];
    for (let i = 0; i < queryArr.length; i += 1) {
      const term = queryArr[i];
      if (term !== '') queryArrTrimmed.push(term);
    }
    // prepend term with hashtag if one isn't already present.
    for (let i = 0; i < queryArrTrimmed.length; i += 1) {
      const term = queryArrTrimmed[i];
      if (term[0] !== '#') {
        const newTerm = '#' + term;
        queryArrTrimmed[i] = newTerm;
      }
    }
    // remove any additional hashes in each hashtag.
    for (let i = 0; i < queryArrTrimmed.length; i += 1) {
      let hashtag = queryArrTrimmed[i];
      for (let j = 1; j < hashtag.length; j += 1) {
        const chr = hashtag[j];
        if (chr === '#') {
          hashtag = hashtag.slice(0, j) + hashtag.slice(j + 1);
          j -= 1;
        }
      }
      // replace the old hashtag with the new hashtag.
      queryArrTrimmed[i] = hashtag;
    }
    console.log('trimmed query arr', queryArrTrimmed);
    // join arr of hashtags back into a string with spaces between each hashtag.
    const queryStr = queryArrTrimmed.join(' OR ');
    console.log('trimmed query str', queryStr);
    this.props.getTweets(queryStr);
  }

  render() {
    return (
      <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div>
          <label>Hash Tags</label>
          <Field name="hashtags" component="input" />
        </div>
        <div>
          <label>Count</label>
          <Field name="count" component="select">
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </Field>
        </div>
        <div>
          <label>Sort by</label>
          <Field name="sort" component="select">
            <option>None</option>
            <option>Favorite Count</option>
            <option>Retweet Count</option>
          </Field>
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

const mapStateToProps = state => ({
  initialValues: {
    count: 10,
    sort: 'none',
  },
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getTweets,
  }, dispatch)
);

TweetsForm = reduxForm({
  form: 'tweets',
})(TweetsForm);

export default connect(mapStateToProps, mapDispatchToProps)(TweetsForm);
