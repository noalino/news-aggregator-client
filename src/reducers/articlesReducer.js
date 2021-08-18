import {
  CHANGE_COUNTRY,
  FETCH_ARTICLES,
  RESET_ARTICLES,
  LOAD,
} from '../actions/types';

const initialState = {
  articles: [],
  isLoading: false,
  country: {
    code: 'us',
    name: 'United States',
    language: {
      code: 'en',
      name: 'English',
    },
  },
  sources: [],
  errMessage: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_COUNTRY:
      return {
        ...state,
        country: payload,
      };
    case LOAD:
      return {
        ...state,
        isLoading: payload,
      };
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: payload,
        isLoading: false,
      };
    case RESET_ARTICLES:
      return {
        ...state,
        articles: [],
        isLoading: false,
      };
    default:
      return state;
  }
};
