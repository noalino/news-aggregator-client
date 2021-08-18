import axios from 'axios';
import {
  CHANGE_COUNTRY,
  FETCH_ARTICLES,
  RESET_ARTICLES,
  LOAD,
} from './types';
import {
  setParams,
  fetchAction,
} from '../_utils';

const { API_KEY } = process.env;

export const changeCountry = country => dispatch => (
  dispatch({
    type: CHANGE_COUNTRY,
    payload: country,
  })
);

export const resetArticles = () => dispatch => (
  dispatch({ type: RESET_ARTICLES })
);

export const getHeadlines = args => async (dispatch) => {
  try {
    const { articles, country, topic } = args;
    const params = { country, category: topic, apiKey: API_KEY };
    const url = `https://newsapi.org/v2/top-headlines?${setParams(params)}`;
    const res = await axios.get(url);
    const { articles: newArticles } = res.data;
    const payload = await fetchAction({ articles, newArticles });

    dispatch({
      type: FETCH_ARTICLES,
      payload,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchArticles = (action, args) => async (dispatch) => {
  try {
    await dispatch({
      type: LOAD,
      payload: true,
    });
    action(args);
  } catch (err) {
    console.error(err);
  }
};

export const displayBookmarks = bookmarks => dispatch => (
  dispatch({
    type: FETCH_ARTICLES,
    payload: bookmarks,
  })
);
