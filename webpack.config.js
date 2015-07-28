import path from 'path';
import webpack from 'webpack';

const host = '127.0.0.1';
const port = 7260;

export default {
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '.'),
  entry: {
    main: [
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
      './src/app.js'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
    publicPath: 'http://127.0.0.1:7260/build'
  },

  module: {
    loaders: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      loaders: [
        'react-hot',
        'babel?stage=0&loose=all'
      ]
    }, {
      test: /\.scss/,
      loader: `style!css?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true`
    }]
  },

  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extension: ['', '.js', '.jsx', '.scss', '.css']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      __DEVTOOLS__: true
    })
  ]
};
