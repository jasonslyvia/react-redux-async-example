import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from './webpack.config';
import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import querystring from 'querystring';

/**
 * Start dev server that serves static webpack compiled files
 */
const host = '127.0.0.1';
const port = 7260;

const serverOptions = {
  contentBase: path.resolve('.'),
  quiet: false,
  noInfo: false,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: `http://${host}:${port}/build`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  stats: {
    colors: true
  }
};

const webpackDevServer = new WebpackDevServer(webpack(config), serverOptions);

webpackDevServer.listen(port, host, () => {
  console.log('Webpack dev server listening on %s:%s', host, port);
});



/**
 * Start API server
 */
import apikey from './apikey';
const channelUrl = 'http://apis.baidu.com/showapi_open_bus/channel_news/channel_news';
const detailUrl = 'http://apis.baidu.com/showapi_open_bus/channel_news/search_news';

const options = {
  headers: {
    apikey
  }
};

const app = express();
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router();

// 加载单个频道下的新闻
router.route('/api/channels/:channelId')
.get((req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  let params = {
    ...req.query
  };

  if (req.params.channelId && req.params.channelId !== 'undefined') {
    params.channelId = req.params.channelId;
  }

  request({
    ...options,
    url: `${detailUrl}?${querystring.stringify(params)}`
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      res.json({
        data: data.showapi_res_body.pagebean.contentlist,
        code: data.showapi_res_body.ret_code
      });
    }
  });
});


// 加载频道列表
router.route('/api/channels')
.get((req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  request({
    ...options,
    url: `${channelUrl}?${querystring.stringify(req.query)}`
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data =  JSON.parse(body);
      res.json({
        data: data.showapi_res_body.channelList,
        code: data.showapi_res_code
      });
    }
  })
});

app.use(router);
app.listen(7261, () => {
  console.log('API server listening on port 7261');
});
