import {CHANNELS_LOAD,
        CHANNELS_LOAD_SUCCESS,
        CHANNELS_LOAD_ERROR,
        NEWS_LOAD,
        NEWS_LOAD_SUCCESS,
        NEWS_LOAD_ERROR,
        SELECT_NEWS,
        NEWS_SEARCH} from '../constants/ActionTypes';
import superagent from 'superagent';
import querystring from 'querystring';

// 加载频道列表
export function loadChannels() {
  return {
    types: [
      CHANNELS_LOAD,
      CHANNELS_LOAD_SUCCESS,
      CHANNELS_LOAD_ERROR
    ],
    payload: new Promise((resolve, reject) => {
      superagent
      .get('http://127.0.0.1:7261/api/channels')
      .end((err, res) => {
        if (err || !res.body) {
          reject();
        }
        else {
          setTimeout(() => {
            resolve(res.body.showapi_res_body.channelList);
          }, 1000);
        }
      });
    })
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
    payload: getNews({channelId})
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
    payload: getNews({title})
  }
}


function getNews(...args) {
  const {channelId, ...rest} = args[0];

  return new Promise((resolve, reject) => {
    superagent
    .get(`http://127.0.0.1:7261/api/channels/${channelId}?${querystring.stringify(rest)}`)
    .end((err, res) => {
      if (err || !res.body) {
        reject({channelId });
      }
      else {
        resolve({
          channelId,
          news: res.body.showapi_res_body.pagebean.contentlist,
          keyword: rest.title || ''
        });
      }
    });
  });
}
