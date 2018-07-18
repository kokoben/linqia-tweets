import React from 'react';
import { reduxForm, Field } from 'redux-form';

let TweetsForm = () => (
  <form>
    <div>
      <label>Hash Tags</label>
      <Field name="hashtags" component="input" />
    </div>
    <button type="submit">Search</button>
  </form>
);

export default TweetsForm = reduxForm({
  form: 'tweets',
})(TweetsForm);
