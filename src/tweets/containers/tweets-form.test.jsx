import React from 'react';
import { shallow } from 'enzyme';
import { formatQuery } from './tweets-form';

describe('query formatting tests', () => {
  test("single hashtag query with no '#' gets prepended with '#'", () => {
    const query = 'winter';
    const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#winter');
  });

  test("single hashtag query with '#'", () => {
    const query = '#winter';
    const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#winter');
  });

  test("single hashtag query with '#' and surrounded with spaces", () => {
    const query = ' #winter ';
    const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#winter');
  });

  test("two hashtags with one space between", () => {
    const query = '#winter #summer';
    const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#winter OR #summer');
  });

  test("two hashtags with two spaces between", () => {
    const query = '#winter  #summer';
    const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#winter OR #summer');
  });

  test("two hashtags with no '#' with two spaces between", () => {
    const query = 'winter  summer';
    const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#winter OR #summer');
  });

  test("two hashtags, one with no '#' and one with '#', with two spaces between", () => {
    const query = 'winter  #summer';
    const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#winter OR #summer');
  });

  test("two hashtags, one with no '#' and one with '#', with two spaces between", () => {
    const query = 'winter  #summer';
     const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#winter OR #summer');
  });

  test("two hashtags, one with no '#' and one with '#', with two spaces between and spaces surrounding", () => {
    const query = '  winter  #summer  ';
     const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#winter OR #summer');
  });

  test("one hashtag with multiple consecutive '#' characters starting from beginning", () => {
    const query = '###summer';
     const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#summer');
  });

  test("one hashtag with multiple consecutive '#' characters starting in the middle", () => {
    const query = 's###ummer';
     const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#summer');
  });

  test("one hashtag with multiple non-consecutive '#' characters starting from the beginning", () => {
    const query = '#s##um#mer';
     const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#summer');
  });

  test("one hashtag with multiple non-consecutive '#' characters starting in the middle", () => {
    const query = 's##um#mer';
     const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#summer');
  });

  test("two hashtags with multiple consecutive '#' characters starting from the beginning", () => {
    const query = '#s##um#mer   #win#t#e#r###';
     const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#summer OR #winter');
  });

  test("three hashtags with multiple consecutive '#' characters starting from the beginning", () => {
    const query = '#s##um#mer   #win#t#e#r###  #f#al#l######';
     const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#summer OR #winter OR #fall');
  });

  test("two hashtags separated by commas", () => {
    const query = '#s##um#mer, #winter';
     const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#summer, OR #winter');
  });

  test("hashtag with prepended # and symbols throughout", () => {
    const query = '#su#$))!@#!@mmer';
     const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#su$))!@!@mmer');
  });

  test("hashtag without prepended # and symbols throughout", () => {
    const query = 'su#$))!@#!@mmer';
     const formattedQuery = formatQuery(query);
    expect(formattedQuery).toEqual('#su$))!@!@mmer');
  });
});
