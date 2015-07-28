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
import apikey as 'apikey';
const API = 'http://apis.baidu.com/apistore/movie/cinema';
const options = {
  url: API,
  headers: {
    apikey
  }
};

const app = express();
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router();
router.route('/api/movies')
.get((req, res) => {
  request({
    ...options,
    url: `${API}?${querystring.stringify(req.query)}`
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.json(JSON.parse(body));
    }
  });
});

app.use(router);
app.listen(7261, () => {
  console.log('API server listening on port 7261');
});
