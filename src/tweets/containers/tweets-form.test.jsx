import React from 'react';
import { shallow } from 'enzyme';
import { formatQuery } from './tweets-form';

describe('query formatting tests', () => {
  test("single hashtag query with no '#' gets prepended with '#'", () => {
    const query = 'winter';

    const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#winter');
  });
});
