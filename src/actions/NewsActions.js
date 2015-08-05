import {CHANNELS_LOAD,
        CHANNELS_LOAD_SUCCESS,
        CHANNELS_LOAD_ERROR,
        NEWS_LOAD,
        NEWS_LOAD_SUCCESS,
        NEWS_LOAD_ERROR,
        SELECT_NEWS,
        NEWS_SEARCH} from '../constants/ActionTypes';

// 加载频道列表
export function loadChannels() {
  return {
    types: [
      CHANNELS_LOAD,
      CHANNELS_LOAD_SUCCESS,
      CHANNELS_LOAD_ERROR
    ]
  };
}


// 选中一个频道，加载新闻列表
export function selectChannel(channelId) {
  return {
    types: [
      NEWS_LOAD,
      NEWS_LOAD_SUCCESS,
      NEWS_LOAD_ERROR
    ],
    params: {channelId}
  };
}


// 选中一条新闻，弹窗显示详情
export function selectNews(newsId) {
  return {
    type: SELECT_NEWS,
    newsId
  };
}


// 输入关键词，搜索对应的新闻
export function searchNews(title) {
  return {
    types: [
      NEWS_LOAD,
      NEWS_LOAD_SUCCESS,
      NEWS_LOAD_ERROR
    ],
    params: {keyword: title},
    fields: ['channelId']
  };
}
