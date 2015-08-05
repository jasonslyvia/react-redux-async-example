import {CHANNELS_LOAD,
        CHANNELS_LOAD_ERROR,
        CHANNELS_LOAD_SUCCESS,
        NEWS_LOAD,
        NEWS_LOAD_ERROR,
        NEWS_LOAD_SUCCESS,
        SELECT_NEWS} from '../constants/ActionTypes';

const initState = {
  channelsReady: false,
  channelsError: false,
  channels: [],
  channelId: null,

  newsReady: false,
  newsError: false,
  news: [],
  newsId: null,

  keyword: ''
};

export function news(state = initState, action) {
  switch(action.type) {
    case CHANNELS_LOAD: {
      return {
        ...state,
        channelsReady: false
      };
    }

    case CHANNELS_LOAD_SUCCESS: {
      return {
        ...state,
        channels: action.data,
        channelsReady: true,
        channelsError: false
      };
    }

    case CHANNELS_LOAD_ERROR: {
      return {
        ...state,
        channelsError: true,
        channelsReady: true
      };
    }

    case NEWS_LOAD: {
      return {
        ...state,
        channelId: action.params.channelId,
        newsReady: false,
        newsError: false
      };
    }

    case NEWS_LOAD_SUCCESS: {
      return {
        ...state,
        channelId: action.params.channelId,
        keyword: action.params.keyword,
        news: action.data,
        newsReady: true,
        newsError: false
      };
    }

    case NEWS_LOAD_ERROR: {
      return {
        ...state,
        channelId: action.params.channelId,
        newsReady: true,
        newsError: true
      };
    }

    case SELECT_NEWS: {
      return {
        ...state,
        newsId: action.newsId
      };
    }

    default: {
      return state;
    }
  }
}
